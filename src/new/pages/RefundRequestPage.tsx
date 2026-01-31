import { useState } from "react";
import {
  CheckCircle,
  Upload,
  X,
  ChevronRight,
  AlertCircle,
  CreditCard,
  FileText,
  User,
  Mail,
  Phone,
  Building,
  Hash,
} from "lucide-react";

interface RefundRequestPageProps {
  onPageChange: (page: string) => void;
}

interface FormData {
  // Step 1: Order Info
  orderCode: string;
  orderDate: string;
  totalAmount: string;
  reason: string;
  description: string;

  // Step 2: Images
  images: File[];

  // Step 3: Contact Info
  fullName: string;
  email: string;
  phone: string;

  // Step 4: Bank Info
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bankBranch: string;
}

export function RefundRequestPage({ onPageChange }: RefundRequestPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    orderCode: "",
    orderDate: "",
    totalAmount: "",
    reason: "",
    description: "",
    images: [],
    fullName: "",
    email: "",
    phone: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    bankBranch: "",
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const steps = [
    { number: 1, title: "Thông Tin Đơn Hàng", icon: FileText },
    { number: 2, title: "Upload Ảnh", icon: Upload },
    { number: 3, title: "Thông Tin Liên Hệ", icon: User },
    { number: 4, title: "Thông Tin Ngân Hàng", icon: CreditCard },
    { number: 5, title: "Xác Nhận", icon: AlertCircle },
    { number: 6, title: "Hoàn Thành", icon: CheckCircle },
  ];

  const reasons = [
    "Sản phẩm không tươi/hỏng",
    "Sản phẩm không đúng mô tả",
    "Thiếu sản phẩm trong đơn hàng",
    "Sản phẩm bị hư hỏng trong vận chuyển",
    "Đổi ý không muốn mua nữa",
    "Lý do khác",
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.orderCode.trim())
        newErrors.orderCode = "Vui lòng nhập mã đơn hàng";
      if (!formData.orderDate) newErrors.orderDate = "Vui lòng chọn ngày đặt";
      if (!formData.totalAmount.trim())
        newErrors.totalAmount = "Vui lòng nhập tổng tiền";
      if (!formData.reason) newErrors.reason = "Vui lòng chọn lý do";
      if (!formData.description.trim())
        newErrors.description = "Vui lòng mô tả chi tiết";
    } else if (step === 2) {
      if (formData.images.length === 0)
        newErrors.images = "Vui lòng upload ít nhất 1 ảnh";
    } else if (step === 3) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Vui lòng nhập họ tên";
      if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email không hợp lệ";
      if (!formData.phone.trim())
        newErrors.phone = "Vui lòng nhập số điện thoại";
      else if (!/^[0-9]{10,11}$/.test(formData.phone))
        newErrors.phone = "Số điện thoại không hợp lệ";
    } else if (step === 4) {
      if (!formData.bankName.trim())
        newErrors.bankName = "Vui lòng nhập tên ngân hàng";
      if (!formData.accountNumber.trim())
        newErrors.accountNumber = "Vui lòng nhập số tài khoản";
      if (!formData.accountHolder.trim())
        newErrors.accountHolder = "Vui lòng nhập tên chủ tài khoản";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      setErrors({ images: "Tối đa 5 ảnh" });
      return;
    }

    setFormData({ ...formData, images: [...formData.images, ...files] });

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const handleSubmit = () => {
    // Mock submission
    console.log("Form submitted:", formData);
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#75b06f] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Yêu Cầu Hoàn Tiền</h1>
          <p className="text-green-100">
            Điền thông tin theo từng bước để tạo yêu cầu hoàn tiền
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        {currentStep < 6 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              {steps.slice(0, 5).map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStep >= step.number
                          ? "bg-[#75b06f] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center hidden md:block ${
                        currentStep >= step.number
                          ? "text-[#75b06f] font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        currentStep > step.number ? "bg-[#75b06f]" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Order Info */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Bước 1: Thông Tin Đơn Hàng
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Đơn Hàng <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.orderCode}
                    onChange={(e) =>
                      setFormData({ ...formData, orderCode: e.target.value })
                    }
                    placeholder="VD: ORD123456"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.orderCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.orderCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.orderCode}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày Đặt Hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) =>
                      setFormData({ ...formData, orderDate: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.orderDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.orderDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.orderDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tổng Tiền Đơn Hàng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.totalAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalAmount: formatCurrency(e.target.value),
                        })
                      }
                      placeholder="VD: 250.000"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                        errors.totalAmount ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      đ
                    </span>
                  </div>
                  {errors.totalAmount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.totalAmount}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lý Do Hoàn Tiền <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                    errors.reason ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Chọn lý do --</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô Tả Chi Tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Mô tả chi tiết vấn đề của sản phẩm hoặc lý do hoàn tiền..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Tiếp Theo <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Upload Images */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Bước 2: Upload Ảnh Sản Phẩm
            </h2>
            <p className="text-gray-600 mb-6">
              Vui lòng upload ảnh sản phẩm (tối đa 5 ảnh)
            </p>

            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  errors.images ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Kéo thả ảnh vào đây hoặc click để chọn
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-[#75b06f] hover:bg-[#5d8f58] text-white px-6 py-2 rounded-lg cursor-pointer transition"
                >
                  Chọn Ảnh
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Định dạng: JPG, PNG (tối đa 5 ảnh)
                </p>
              </div>

              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Quay Lại
              </button>
              <button
                onClick={handleNext}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Tiếp Theo <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Bước 3: Thông Tin Liên Hệ
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="0912345678"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Quay Lại
              </button>
              <button
                onClick={handleNext}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Tiếp Theo <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Bank Info */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Bước 4: Thông Tin Ngân Hàng
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi sẽ hoàn tiền vào tài khoản này trong 3-5 ngày làm việc
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Ngân Hàng <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                    placeholder="VD: Vietcombank, Techcombank..."
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.bankName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.bankName && (
                  <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số Tài Khoản <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="1234567890"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.accountNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Chủ Tài Khoản <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.accountHolder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountHolder: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="NGUYEN VAN A"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f] ${
                      errors.accountHolder ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.accountHolder && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountHolder}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  * Nhập đúng như trên thẻ/tài khoản (không dấu, viết hoa)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chi Nhánh Ngân Hàng (nếu có)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.bankBranch}
                    onChange={(e) =>
                      setFormData({ ...formData, bankBranch: e.target.value })
                    }
                    placeholder="VD: Chi nhánh Hà Nội"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75b06f]"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold text-gray-800 mb-1">
                      Lưu ý quan trọng:
                    </p>
                    <p>
                      Vui lòng kiểm tra kỹ thông tin tài khoản. Nếu thông tin sai,
                      quá trình hoàn tiền có thể bị chậm trễ hoặc thất bại.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Quay Lại
              </button>
              <button
                onClick={handleNext}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Tiếp Theo <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Bước 5: Xác Nhận Thông Tin
            </h2>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#75b06f]" />
                  Thông Tin Đơn Hàng
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Mã đơn hàng:</span>{" "}
                    <span className="font-semibold">{formData.orderCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ngày đặt:</span>{" "}
                    <span className="font-semibold">
                      {new Date(formData.orderDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tổng tiền:</span>{" "}
                    <span className="font-semibold">
                      {formData.totalAmount}đ
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Lý do:</span>{" "}
                    <span className="font-semibold">{formData.reason}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Mô tả:</span>{" "}
                    <span className="font-semibold">{formData.description}</span>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#75b06f]" />
                  Ảnh Sản Phẩm ({formData.images.length})
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {previewImages.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Product ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#75b06f]" />
                  Thông Tin Liên Hệ
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Họ tên:</span>{" "}
                    <span className="font-semibold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>{" "}
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Số điện thoại:</span>{" "}
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Bank Info */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#75b06f]" />
                  Thông Tin Ngân Hàng
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Ngân hàng:</span>{" "}
                    <span className="font-semibold">{formData.bankName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Số tài khoản:</span>{" "}
                    <span className="font-semibold">
                      {formData.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Chủ tài khoản:</span>{" "}
                    <span className="font-semibold">
                      {formData.accountHolder}
                    </span>
                  </div>
                  {formData.bankBranch && (
                    <div>
                      <span className="text-gray-600">Chi nhánh:</span>{" "}
                      <span className="font-semibold">{formData.bankBranch}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Quay Lại
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Gửi Yêu Cầu <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Success */}
        {currentStep === 6 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Gửi Yêu Cầu Thành Công!
            </h2>
            <p className="text-gray-600 mb-2">
              Mã yêu cầu:{" "}
              <span className="font-bold text-[#75b06f]">
                REF{Date.now().toString().slice(-8)}
              </span>
            </p>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã nhận được yêu cầu hoàn tiền của bạn và sẽ xử lý trong
              vòng 24-48 giờ làm việc.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-left mb-6">
              <p className="font-semibold text-gray-800 mb-2">
                📧 Email xác nhận đã được gửi
              </p>
              <p className="text-sm text-gray-700">
                Chúng tôi đã gửi email xác nhận đến{" "}
                <strong>{formData.email}</strong>. Vui lòng kiểm tra hộp thư để
                theo dõi tiến trình.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600 text-left max-w-md mx-auto mb-6">
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                Chúng tôi sẽ xem xét và phản hồi trong 24-48 giờ
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                Nếu được chấp nhận, tiền sẽ được hoàn trong 3-5 ngày làm việc
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                Bạn có thể liên hệ hotline 1900 xxxx nếu cần hỗ trợ
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => onPageChange("home")}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Về Trang Chủ
              </button>
              <button
                onClick={() => onPageChange("return")}
                className="bg-[#75b06f] hover:bg-[#5d8f58] text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Xem Chính Sách Đổi Trả
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
