import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import HeroSection from '@components/home/HeroSection/HeroSection'
import CategorySection from '@components/home/CategorySection/CategorySection'
import FloatingChatButton from '@components/common/FloatingChatButton/FloatingChatButton'
import { mockProducts, categories } from '@utils/mockData'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section with integrated search */}
        <HeroSection />
        
        {/* Vegetables Category */}
        <CategorySection
          title={categories.vegetables.name}
          tabs={categories.vegetables.tabs}
          products={mockProducts.vegetables}
        />
        
        {/* Fruits Category */}
        <CategorySection
          title={categories.fruits.name}
          tabs={categories.fruits.tabs}
          products={mockProducts.fruits}
        />
        
        {/* Meat & Seafood Category */}
        <CategorySection
          title={categories.meatSeafood.name}
          tabs={categories.meatSeafood.tabs}
          products={mockProducts.meatSeafood}
        />
        
        {/* Dried Food Category */}
        <CategorySection
          title={categories.driedFood.name}
          tabs={categories.driedFood.tabs}
          products={mockProducts.driedFood}
        />
      </main>
      
      <Footer />
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  )
}

export default Home

