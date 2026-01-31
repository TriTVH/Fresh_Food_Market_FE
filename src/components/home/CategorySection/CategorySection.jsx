import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import CategoryTabs from '@components/product/CategoryTabs/CategoryTabs'
import ProductCard from '@components/product/ProductCard/ProductCard'

function CategorySection({ title, tabs, products }) {
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-display font-bold text-gray-800">
            {title}
          </h2>
          <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Xem tất cả
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Category Tabs */}
        <div className="mb-8">
          <CategoryTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
