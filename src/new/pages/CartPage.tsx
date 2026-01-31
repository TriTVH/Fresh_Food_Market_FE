import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  CheckCircle2,
  MapPin,
  Package,
  Wallet,
  CreditCard,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { SubscriptionSection } from "../components/SubscriptionSection";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number; // Giá gốc trước khi giảm
  quantity: number;
  weight?: number;
  unit?: string;
  origin?: string;
  discount?: number; // Phần trăm giảm giá
}

export interface Voucher {
  voucher_id: string;
  code: string;
  title: string;
  discount_percentage: number;
  max_discount_value?: number; // Giá trị giảm tối đa
  max_usage: number;
  current_usage: number;
  status: "active" | "expired" | "inactive";
  valid_from: string;
  to_date: string;
  type_discount_time: "limited" | "unlimited";
  min_order_value?: number;
}

export interface Address {
  address_id: string;
  street: string;
  ward: string;
  city: string;
  province: string;
  is_default: boolean;
}

interface CartPageProps {
  onPageChange: (page: string) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  currentUser: { email: string; name: string } | null;
}

// Mock voucher data
const MOCK_VOUCHERS: Voucher[] = [
  {
    voucher_id: "V001",
    code: "FRESH10",
    title: "Giảm 10% cho đơn hàng đầu tiên",
    discount_percentage: 10,
    max_discount_value: 50000, // Giảm tối đa 50K
    max_usage: 100,
    current_usage: 45,
    status: "active",
    valid_from: "2026-01-01",
    to_date: "2026-03-31",
    type_discount_time: "limited",
    min_order_value: 100000,
  },
  {
    voucher_id: "V002",
    code: "FRESH20",
    title: "Giảm 20% cho đơn từ 500K",
    discount_percentage: 20,
    max_discount_value: 150000, // Giảm tối đa 150K
    max_usage: 50,
    current_usage: 23,
    status: "active",
    valid_from: "2026-01-01",
    to_date: "2026-02-28",
    type_discount_time: "limited",
    min_order_value: 500000,
  },
  {
    voucher_id: "V003",
    code: "FRESH15",
    title: "Giảm 15% cho đơn từ 300K",
    discount_percentage: 15,
    max_discount_value: 100000, // Giảm tối đa 100K
    max_usage: 75,
    current_usage: 60,
    status: "active",
    valid_from: "2026-01-10",
    to_date: "2026-02-20",
    type_discount_time: "limited",
    min_order_value: 300000,
  },
  {
    voucher_id: "V004",
    code: "FRESH5",
    title: "Giảm 5% cho mọi đơn hàng",
    discount_percentage: 5,
    max_discount_value: 30000, // Giảm tối đa 30K
    max_usage: 200,
    current_usage: 150,
    status: "active",
    valid_from: "2026-01-01",
    to_date: "2026-12-31",
    type_discount_time: "limited",
    min_order_value: 0,
  },
];

// Mock address data
const MOCK_ADDRESSES: Address[] = [
  {
    address_id: "A001",
    street: "47 Trần Hưng Đạo",
    province: "Hồ Chí Minh",
    ward: "Bà Rịa",
    city: "Thành Phố Hồ Chí Minh",
    is_default: true,
  },
  {
    address_id: "A002",
    street: "47 Phạm Ngọc Thạch",
    province: "Hồ Chí Minh",
    ward: "Bà Rịa",
    city: "Thành Phố Hồ Chí Minh",
    is_default: false,
  },
];

export function CartPage({
  onPageChange,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currentUser,
}: CartPageProps) {
  const [selectedVouchers, setSelectedVouchers] = useState<Voucher[]>([]);
  const [showVoucherModal, setShowVoucherModal] =
    useState(false);
  const [addresses, setAddresses] =
    useState<Address[]>(MOCK_ADDRESSES);
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(
      MOCK_ADDRESSES.find((addr) => addr.is_default) || null,
    );
  const [showAddressModal, setShowAddressModal] =
    useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "COD" | "ONLINE" | null
  >(null);

  // Subscription data state
  const [subscriptionData, setSubscriptionData] = useState<{
    orderCount: number;
    originalTotal: number;
    discount: number;
    finalTotal: number;
  } | null>(null);

  // Callback to update subscription data
  const handleSubscriptionUpdate = (data: typeof subscriptionData) => {
    console.log("🟢 CartPage received subscription data:", data);
    setSubscriptionData(data);
  };

  // Log when subscription data changes
  console.log("💎 CartPage subscriptionData state:", subscriptionData);

  // Form states for adding new address
  const [newAddress, setNewAddress] = useState({
    street_address: "",
    ward_id: "",
    province_id: "",
    city_id: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.ward}, ${address.city}, ${address.province}`;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = subtotal > 0 ? 30000 : 0;

  // Calculate discount from vouchers based on order type
  const orderValueForDiscount = subscriptionData
    ? subscriptionData.originalTotal
    : subtotal;

  const voucherDiscount = selectedVouchers.reduce(
    (totalDiscount, voucher) =>
      totalDiscount +
      Math.min(
        Math.round(
          (orderValueForDiscount * voucher.discount_percentage) /
            100,
        ),
        voucher.max_discount_value || Infinity,
      ),
    0,
  );

  const total = subtotal + shippingFee - voucherDiscount;

  const handleQuantityChange = (
    id: string,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && newQuantity <= 99) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để thanh toán!");
      onPageChange("login");
      return;
    }
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ nhận hàng!");
      return;
    }
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    // TODO: Navigate to checkout page
    alert(
      `Đặt hàng thành công!\nPhương thức: ${paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : "Thanh toán trực tuyến"}`,
    );
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    // Determine the order value to check against
    const orderValueToCheck = subscriptionData
      ? subscriptionData.originalTotal
      : subtotal;

    // Check if voucher meets minimum order value
    if (
      voucher.min_order_value &&
      orderValueToCheck < voucher.min_order_value
    ) {
      alert(
        `Đơn hàng tối thiểu ${formatPrice(voucher.min_order_value)} để sử dụng voucher này!`,
      );
      return;
    }

    // Check if voucher is still available
    if (voucher.current_usage >= voucher.max_usage) {
      alert("Voucher đã hết lượt sử dụng!");
      return;
    }

    // Toggle selection
    if (selectedVouchers.some((v) => v.voucher_id === voucher.voucher_id)) {
      setSelectedVouchers(
        selectedVouchers.filter((v) => v.voucher_id !== voucher.voucher_id),
      );
    } else {
      setSelectedVouchers([...selectedVouchers, voucher]);
      // Don't close modal - allow selecting multiple vouchers
    }
  };

  const getAvailableVouchers = () => {
    return MOCK_VOUCHERS.filter(
      (v) =>
        v.status === "active" && v.current_usage < v.max_usage,
    );
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      is_default: addr.address_id === addressId,
    }));
    setAddresses(updatedAddresses);
    const newDefault = updatedAddresses.find(
      (addr) => addr.address_id === addressId,
    );
    if (newDefault) {
      setSelectedAddress(newDefault);
    }
    alert("Đã đặt làm địa chỉ mặc định!");
  };

  const handleDeleteAddress = (addressId: string) => {
    if (addresses.length <= 1) {
      alert("Không thể xóa địa chỉ cuối cùng!");
      return;
    }

    if (!confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      return;
    }

    // Find the address being deleted
    const addressToDelete = addresses.find(
      (addr) => addr.address_id === addressId,
    );

    // Filter out the deleted address
    let updatedAddresses = addresses.filter(
      (addr) => addr.address_id !== addressId,
    );

    // If we deleted the default address, make the first remaining address the default
    if (
      addressToDelete?.is_default &&
      updatedAddresses.length > 0
    ) {
      updatedAddresses = updatedAddresses.map(
        (addr, index) => ({
          ...addr,
          is_default: index === 0,
        }),
      );
    }

    setAddresses(updatedAddresses);

    // If the deleted address was selected, select the first address
    if (selectedAddress?.address_id === addressId) {
      setSelectedAddress(updatedAddresses[0] || null);
    }

    alert("Đã xóa địa chỉ!");
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true);
    // Reset form fields
    setNewAddress({
      street_address: "",
      ward_id: "",
      province_id: "",
      city_id: "",
    });
  };

  const handleSaveNewAddress = () => {
    // Validate and save new address
    if (
      !newAddress.street_address ||
      !newAddress.ward_id ||
      !newAddress.province_id ||
      !newAddress.city_id
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ!");
      return;
    }

    // Generate unique ID based on existing IDs
    const existingIds = addresses.map((addr) => {
      const match = addr.address_id.match(/A(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId =
      existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const newId = `A${String(maxId + 1).padStart(3, "0")}`;

    const newAddressObj: Address = {
      address_id: newId,
      street: newAddress.street_address,
      ward: newAddress.ward_id,
      province: newAddress.province_id,
      city: newAddress.city_id,
      is_default: false,
    };

    setAddresses([...addresses, newAddressObj]);
    setSelectedAddress(newAddressObj);
    setIsAddingAddress(false);
    // Keep address modal open to show the new address
    alert(
      "Địa chỉ mới đã được thêm và chọn làm địa chỉ nhận hàng!",
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <button
            onClick={() => onPageChange("home")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#75b06f] transition-colors mb-3 sm:mb-4"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">
              Tiếp Tục Mua Sắm
            </span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {cartItems.length > 0
              ? `Bạn có ${cartItems.length} sản phẩm trong giỏ hàng`
              : "Giỏ hàng của bạn đang trống"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 sm:p-6 mb-4 sm:mb-6">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Giỏ Hàng Trống
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám
              phá các sản phẩm tươi ngon của chúng tôi!
            </p>
            <button
              onClick={() => onPageChange("products")}
              className="bg-[#75b06f] text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-[#5a9450] transition-colors text-sm sm:text-base"
            >
              Khám Phá Sản Phẩm
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-2 sm:gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                      {/* Discount Badge */}
                      {item.discount && (
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md">
                          <span className="font-bold text-xs sm:text-sm">
                            -{item.discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      {item.weight && item.unit && (
                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">
                          {item.weight} {item.unit}
                        </p>
                      )}
                      {item.origin && (
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          Xuất xứ: {item.origin}
                        </p>
                      )}

                      {/* Price Display with Original Price */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base sm:text-lg font-bold text-[#75b06f]">
                          {formatPrice(item.price)}
                        </p>
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <p className="text-xs sm:text-sm text-gray-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 sm:p-2"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity,
                              -1,
                            )
                          }
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity,
                              1,
                            )
                          }
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors"
                          disabled={item.quantity >= 99}
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      <p className="font-bold text-gray-800 mt-1 sm:mt-2 text-sm sm:text-base">
                        {formatPrice(
                          item.price * item.quantity,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Subscription Section */}
              <SubscriptionSection 
                cartItems={cartItems}
                formatPrice={formatPrice}
                onSubscriptionUpdate={handleSubscriptionUpdate}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Tổng Đơn Hàng
                </h2>

                {/* Address Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-[#75b06f]" />
                    <span className="font-semibold text-gray-800 uppercase text-sm">
                      Địa Chỉ Nhận Hàng
                    </span>
                  </div>

                  {selectedAddress ? (
                    <div className="border-2 border-blue-400 rounded-lg p-4 bg-blue-50/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {formatAddress(selectedAddress)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setShowAddressModal(true)
                          }
                          className="text-[#75b06f] text-sm font-semibold hover:underline ml-3 flex-shrink-0"
                        >
                          THAY ĐỔI
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors text-sm"
                    >
                      Chưa có địa chỉ
                    </button>
                  )}
                </div>

                {/* Voucher Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#75b06f]" />
                      <span className="font-semibold text-gray-800">
                        Mã Giảm Giá
                      </span>
                    </div>
                  </div>

                  {selectedVouchers.length > 0 ? (
                    <div className="space-y-2">
                      {selectedVouchers.map((voucher) => (
                        <div
                          key={voucher.voucher_id}
                          className="bg-gradient-to-r from-[#75b06f]/10 to-green-100 border-2 border-[#75b06f] rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-[#75b06f]" />
                                <span className="font-bold text-[#75b06f] text-sm">
                                  {voucher.code}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 mb-0.5">
                                {voucher.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                Giảm {voucher.discount_percentage}%
                                {voucher.max_discount_value && ` (tối đa ${formatPrice(voucher.max_discount_value)})`}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                setSelectedVouchers(
                                  selectedVouchers.filter(
                                    (v) => v.voucher_id !== voucher.voucher_id,
                                  ),
                                )
                              }
                              className="text-red-500 hover:text-red-700 text-xs font-semibold ml-2"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowVoucherModal(true)}
                        className="w-full text-[#75b06f] text-sm font-semibold hover:underline py-2"
                      >
                        + Thêm voucher khác
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowVoucherModal(true)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-[#75b06f] hover:text-[#75b06f] transition-colors text-sm font-semibold"
                    >
                      + Chọn hoặc nhập mã giảm giá
                    </button>
                  )}

                  {getAvailableVouchers().length > 0 && (
                    <button
                      onClick={() =>
                        setShowVoucherModal(true)
                      }
                      className="text-[#75b06f] text-sm font-semibold hover:underline mt-2"
                    >
                      Xem {getAvailableVouchers().length} mã
                      giảm giá khả dụng
                    </button>
                  )}
                </div>

                {/* Payment Method Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-5 h-5 text-[#75b06f]" />
                    <span className="font-semibold text-gray-800 uppercase text-sm">
                      Phương Thức Thanh Toán
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* COD Option */}
                    <div
                      onClick={() => setPaymentMethod("COD")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "COD"
                          ? "border-[#75b06f] bg-[#75b06f]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-base">
                            Thanh toán khi nhận hàng (COD)
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Thanh toán bằng tiền mặt khi nhận
                            hàng
                          </p>
                        </div>
                        {paymentMethod === "COD" && (
                          <CheckCircle2 className="w-6 h-6 text-[#75b06f] flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Online Option */}
                    <div
                      onClick={() => setPaymentMethod("ONLINE")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "ONLINE"
                          ? "border-[#75b06f] bg-[#75b06f]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-base">
                            Thanh toán trực tuyến
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Thanh toán qua ví điện tử, ngân hàng
                          </p>
                        </div>
                        {paymentMethod === "ONLINE" && (
                          <CheckCircle2 className="w-6 h-6 text-[#75b06f] flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-4 border-t pt-4">
                  {subscriptionData ? (
                    /* Subscription pricing */
                    <>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Đơn hàng định kỳ (
                          {subscriptionData.orderCount} đơn)
                        </p>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tạm tính:</span>
                        <span className="font-semibold">
                          {formatPrice(
                            subscriptionData.originalTotal,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá định kỳ (10%):</span>
                        <span className="font-semibold">
                          -
                          {formatPrice(
                            subscriptionData.discount,
                          )}
                        </span>
                      </div>
                      {voucherDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm giá từ voucher:</span>
                          <span className="font-semibold">
                            -{formatPrice(voucherDiscount)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                          <span>Tổng cộng:</span>
                          <span className="text-purple-600">
                            {formatPrice(
                              subscriptionData.finalTotal - voucherDiscount,
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Normal cart pricing */
                    <>
                      <div className="flex justify-between text-gray-600">
                        <span>Tạm tính:</span>
                        <span className="font-semibold">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển:</span>
                        <span className="font-semibold">
                          {formatPrice(shippingFee)}
                        </span>
                      </div>
                      {voucherDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm giá:</span>
                          <span className="font-semibold">
                            -{formatPrice(voucherDiscount)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                          <span>Tổng cộng:</span>
                          <span className="text-[#75b06f]">
                            {formatPrice(total)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Important Note */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                        Lưu ý quan trọng
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                        Nhân viên sẽ gọi xác nhận đơn hàng của
                        bạn trong thời gian sớm nhất trong vòng
                        24 giờ.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#75b06f] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#5a9450] transition-colors shadow-lg hover:shadow-xl"
                >
                  {paymentMethod === "COD"
                    ? "Đặt Hàng"
                    : "Tiến Hành Thanh Toán"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Voucher Modal */}
        {showVoucherModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                    Chọn Mã Giảm Giá
                  </h2>
                  <button
                    onClick={() => setShowVoucherModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Có thể chọn nhiều mã giảm giá cho đơn hàng của bạn
                </p>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {getAvailableVouchers().length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Không có mã giảm giá khả dụng
                    </div>
                  ) : (
                    getAvailableVouchers().map((voucher) => {
                      // Use subscription total if active, otherwise use cart subtotal
                      const orderValueToCheck = subscriptionData
                        ? subscriptionData.originalTotal
                        : subtotal;

                      const isEligible =
                        !voucher.min_order_value ||
                        orderValueToCheck >= voucher.min_order_value;
                      const isSelected =
                        selectedVouchers.some(
                          (v) => v.voucher_id === voucher.voucher_id,
                        );
                      const remaining =
                        voucher.max_usage - voucher.current_usage;

                      return (
                        <div
                          key={voucher.voucher_id}
                          className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#75b06f] bg-[#75b06f]/5"
                              : isEligible
                                ? "border-gray-200 hover:border-[#75b06f] hover:shadow-md"
                                : "border-gray-200 opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() =>
                            isEligible && handleSelectVoucher(voucher)
                          }
                        >
                          <div className="flex items-start gap-2 sm:gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#75b06f] to-green-600 rounded-lg flex items-center justify-center">
                              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1 sm:mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-0.5 sm:mb-1">
                                    {voucher.code}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                                    {voucher.title}
                                  </p>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#75b06f] flex-shrink-0 ml-2" />
                                )}
                              </div>

                              <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-500">
                                <p>
                                  <span className="font-semibold text-[#75b06f]">
                                    Giảm{" "}
                                    {
                                      voucher.discount_percentage
                                    }
                                    %
                                  </span>
                                </p>
                                {voucher.max_discount_value && (
                                  <p>
                                    Giảm tối đa:{" "}
                                    {formatPrice(
                                      voucher.max_discount_value,
                                    )}
                                  </p>
                                )}
                                {voucher.min_order_value ? (
                                  <p>
                                    Đơn tối thiểu:{" "}
                                    {formatPrice(
                                      voucher.min_order_value,
                                    )}
                                    {isEligible && (
                                      <span className="text-green-600 font-semibold ml-1">
                                        ✓ Đã đạt
                                      </span>
                                    )}
                                  </p>
                                ) : (
                                  <p className="text-green-600 font-semibold">
                                    Áp dụng cho mọi đơn hàng
                                  </p>
                                )}
                                <p>
                                  HSD:{" "}
                                  {formatDate(
                                    voucher.valid_from,
                                  )}{" "}
                                  -{" "}
                                  {formatDate(voucher.to_date)}
                                </p>
                                <p>
                                  Còn lại: {remaining}/
                                  {voucher.max_usage} lượt
                                </p>
                              </div>

                              {!isEligible &&
                                voucher.min_order_value && (
                                  <div className="mt-2 text-xs text-red-500 font-semibold">
                                    Cần thêm{" "}
                                    {formatPrice(
                                      voucher.min_order_value -
                                        orderValueToCheck,
                                    )}{" "}
                                    để áp dụng
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t bg-gray-50">
                <button
                  onClick={() => setShowVoucherModal(false)}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                    Chọn Địa Chỉ Nhận Hàng
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Chọn 1 địa chỉ nhận hàng phù hợp với đơn hàng
                  của bạn
                </p>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {addresses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Không có địa chỉ nào
                    </div>
                  ) : (
                    addresses.map((address) => {
                      const isSelected =
                        selectedAddress?.address_id ===
                        address.address_id;

                      return (
                        <div
                          key={address.address_id}
                          onClick={() =>
                            handleSelectAddress(address)
                          }
                          className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#75b06f] bg-[#75b06f]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start gap-2 sm:gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#75b06f] to-green-600 rounded-lg flex items-center justify-center">
                              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-bold text-gray-800 text-sm sm:text-lg line-clamp-2">
                                      {formatAddress(address)}
                                    </h3>
                                    {address.is_default && (
                                      <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-md bg-[#75b06f] text-white text-xs font-semibold flex-shrink-0">
                                        Mặc định
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#75b06f] flex-shrink-0 ml-2" />
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-2 sm:mt-3 flex-wrap">
                                {!address.is_default && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSetDefaultAddress(
                                        address.address_id,
                                      );
                                    }}
                                    className="text-xs sm:text-sm text-[#75b06f] font-semibold hover:underline py-1 px-2 hover:bg-[#75b06f]/10 rounded transition-colors"
                                  >
                                    Đặt làm mặc định
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(
                                      address.address_id,
                                    );
                                  }}
                                  className="text-xs sm:text-base text-red-500 font-semibold hover:underline flex items-center gap-1 sm:gap-1.5 py-1 px-2 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t bg-gray-50 space-y-2">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Đóng
                </button>
                <button
                  onClick={handleAddAddress}
                  className="w-full bg-[#75b06f] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#5a9450] transition-colors text-sm sm:text-base"
                >
                  Thêm Địa Chỉ Mới
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add New Address Modal */}
        {showAddressModal && isAddingAddress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                    Thêm Địa Chỉ Mới
                  </h2>
                  <button
                    onClick={() => setIsAddingAddress(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Điền thông tin địa chỉ mới của bạn
                </p>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1">
                      Địa chỉ đường
                    </label>
                    <input
                      type="text"
                      value={newAddress.street_address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          street_address: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-300 rounded-lg p-2.5 sm:p-3 focus:outline-none focus:border-[#75b06f] text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1">
                      Phường/Xã
                    </label>
                    <input
                      type="text"
                      value={newAddress.ward_id}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          ward_id: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-300 rounded-lg p-2.5 sm:p-3 focus:outline-none focus:border-[#75b06f] text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      value={newAddress.city_id}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          city_id: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-300 rounded-lg p-2.5 sm:p-3 focus:outline-none focus:border-[#75b06f] text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1">
                      Tỉnh
                    </label>
                    <input
                      type="text"
                      value={newAddress.province_id}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          province_id: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-300 rounded-lg p-2.5 sm:p-3 focus:outline-none focus:border-[#75b06f] text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t bg-gray-50 space-y-2">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSaveNewAddress}
                  className="w-full bg-[#75b06f] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#5a9450] transition-colors text-sm sm:text-base"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}