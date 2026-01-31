import { useState } from "react";
import { CalendarDays, RotateCw, Check, Package, Sparkles } from "lucide-react";
import type { CartItem } from "../pages/CartPage";

interface SubscriptionSectionProps {
  cartItems: CartItem[];
  formatPrice: (price: number) => string;
  onSubscriptionUpdate: (data: {
    orderCount: number;
    originalTotal: number;
    discount: number;
    finalTotal: number;
  } | null) => void;
}

type FrequencyType = "weekly" | "monthly";

interface SubscriptionOrder {
  orderNumber: number;
  deliveryDate: string;
  total: number;
}

export function SubscriptionSection({
  cartItems,
  formatPrice,
  onSubscriptionUpdate,
}: SubscriptionSectionProps) {
  console.log("🔵 SubscriptionSection mounted, onSubscriptionUpdate:", !!onSubscriptionUpdate);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [enableSubscription, setEnableSubscription] =
    useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] =
    useState<FrequencyType>("weekly");
  const [generatedOrders, setGeneratedOrders] = useState<
    SubscriptionOrder[]
  >([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleToggleSubscription = (enabled: boolean) => {
    setEnableSubscription(enabled);
    if (!enabled) {
      // When turning off subscription, clear all data
      setStartDate("");
      setEndDate("");
      setGeneratedOrders([]);
      setShowPreview(false);
      onSubscriptionUpdate(null); // Clear parent state
    }
  };

  const handleGenerateOrders = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng chọn ngày bắt đầu và kết thúc!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert("Ngày kết thúc phải sau ngày bắt đầu!");
      return;
    }

    // Calculate delivery dates based on frequency
    const deliveryDates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      deliveryDates.push(new Date(currentDate));
      if (frequency === "weekly") {
        currentDate.setDate(currentDate.getDate() + 7);
      } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    // Calculate total for each order (same cart items)
    const orderTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Generate orders
    const orders: SubscriptionOrder[] = deliveryDates.map(
      (date, index) => ({
        orderNumber: index + 1,
        deliveryDate: date.toLocaleDateString("vi-VN"),
        total: orderTotal,
      }),
    );

    setGeneratedOrders(orders);
    setShowPreview(true);

    // 🔥 AUTO UPDATE PARENT - Send data to parent immediately
    const totalOrders = orders.length;
    const totalValue = orders.reduce(
      (sum, order) => sum + order.total,
      0,
    );
    const discount = 0.1; // 10% discount for subscription
    const savings = Math.round(totalValue * discount);

    const subscriptionData = {
      orderCount: totalOrders,
      originalTotal: totalValue,
      discount: savings,
      finalTotal: Math.round(totalValue * 0.9),
    };

    console.log("🔥 Auto-sending subscription data:", subscriptionData);
    console.log("🔥 onSubscriptionUpdate exists?", !!onSubscriptionUpdate);

    if (onSubscriptionUpdate) {
      onSubscriptionUpdate(subscriptionData);
      console.log("✅ Data sent to parent automatically!");
    } else {
      console.log("❌ onSubscriptionUpdate is undefined!");
    }
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMinEndDate = () => {
    if (!startDate) return getTodayString();
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1);
    return start.toISOString().split("T")[0];
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-sm border-2 border-purple-200 p-4 sm:p-6">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <RotateCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base sm:text-lg">
              Đơn Hàng Định Kỳ
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Tiết kiệm 10% khi đặt hàng định kỳ
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            -{10}%
          </span>
          <span
            className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 space-y-4">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-purple-300">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">
                Kích hoạt đơn định kỳ
              </span>
            </div>
            <button
              onClick={() =>
                handleToggleSubscription(!enableSubscription)
              }
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                enableSubscription
                  ? "bg-purple-600"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  enableSubscription
                    ? "translate-x-8"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Configuration Form */}
          {enableSubscription && (
            <>
              <div className="space-y-4 p-4 bg-white rounded-lg border-2 border-purple-200">
                {/* Frequency Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tần suất giao hàng
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFrequency("weekly")}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                        frequency === "weekly"
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-300 text-gray-600 hover:border-purple-300"
                      }`}
                    >
                      Hàng tuần
                    </button>
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                        frequency === "monthly"
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-300 text-gray-600 hover:border-purple-300"
                      }`}
                    >
                      Hàng tháng
                    </button>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày bắt đầu
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          setStartDate(e.target.value)
                        }
                        min={getTodayString()}
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày kết thúc
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                          setEndDate(e.target.value)
                        }
                        min={getMinEndDate()}
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateOrders}
                  className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Tạo Danh Sách Đơn Hàng
                </button>
              </div>

              {/* Preview Orders */}
              {showPreview && generatedOrders.length > 0 && (
                <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Danh sách đơn hàng ({generatedOrders.length}{" "}
                    đơn)
                  </h4>

                  {/* Orders List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                    {generatedOrders.map((order) => (
                      <div
                        key={order.orderNumber}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {order.orderNumber}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              Đơn hàng #{order.orderNumber}
                            </p>
                            <p className="text-xs text-gray-600">
                              Giao: {order.deliveryDate}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-800 text-sm">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="border-t-2 border-gray-200 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Tổng giá trị:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(
                          generatedOrders.reduce(
                            (sum, order) => sum + order.total,
                            0,
                          ),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">
                        Giảm giá (10%):
                      </span>
                      <span className="font-semibold text-green-600">
                        -
                        {formatPrice(
                          Math.round(
                            generatedOrders.reduce(
                              (sum, order) => sum + order.total,
                              0,
                            ) * 0.1,
                          ),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t">
                      <span className="font-bold text-gray-800">
                        Tổng thanh toán:
                      </span>
                      <span className="font-bold text-purple-600">
                        {formatPrice(
                          Math.round(
                            generatedOrders.reduce(
                              (sum, order) => sum + order.total,
                              0,
                            ) * 0.9,
                          ),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Benefits */}
        </div>
      )}
    </div>
  );
}
