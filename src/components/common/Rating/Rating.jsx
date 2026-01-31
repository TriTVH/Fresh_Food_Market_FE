import { FiStar } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

function Rating({ rating = 0, reviewCount = 0, showCount = true, size = 'sm' }) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`${sizes[size]}`}>
            {star <= rating ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FiStar className="text-gray-300" />
            )}
          </span>
        ))}
      </div>
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  )
}

export default Rating
