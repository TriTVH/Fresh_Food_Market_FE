import { FiMessageCircle } from 'react-icons/fi'

function FloatingChatButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
      aria-label="Chat với chúng tôi"
    >
      <FiMessageCircle className="w-6 h-6" />
      
      {/* Notification Badge */}
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
        1
      </span>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat với chúng tôi
      </span>
    </button>
  )
}

export default FloatingChatButton
