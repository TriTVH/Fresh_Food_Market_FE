function Badge({ children, type = 'default', className = '' }) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  
  const types = {
    default: 'bg-gray-100 text-gray-800',
    discount: 'bg-red-500 text-white',
    organic: 'bg-green-100 text-green-800',
    new: 'bg-blue-100 text-blue-800',
  }
  
  return (
    <span className={`${baseStyles} ${types[type]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
