import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // TODO: Implement search functionality
  }
  
  return (
    <div className="container mx-auto px-4 -mt-8 relative z-10">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-2 flex items-center gap-2">
          <div className="flex items-center flex-1 px-4">
            <FiSearch className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-3 outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            Tìm
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
