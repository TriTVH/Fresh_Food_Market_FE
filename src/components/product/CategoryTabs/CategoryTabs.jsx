import { useState } from 'react'

function CategoryTabs({ tabs = [], activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
            activeTab === index
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
