import { FiUser, FiX } from 'react-icons/fi'

function LoginAlertModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative animate-slideUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-4 mb-4">
            <FiUser className="w-12 h-12 text-yellow-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Yêu Cầu Đăng Nhập</h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để sử dụng tính năng này. Vui lòng đăng nhập hoặc tạo tài khoản
            mới.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onLogin}
              className="flex-1 bg-[#75b06f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#5a9450] transition-colors"
            >
              Đăng Nhập
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAlertModal
