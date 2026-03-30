import { useState, useEffect } from 'react'
import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import HeroSection from '@components/home/HeroSection/HeroSection'
import CategorySection from '@components/home/CategorySection/CategorySection'
import FloatingChatButton from '@components/common/FloatingChatButton/FloatingChatButton'
// remove mockData imports
import { fetchProducts } from '@/api/productApi'
import { mapProductDtoToFrontend } from '@/utils/mapper'

function Home() {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(true);
        if (response && response.success && response.data) {
           const products = response.data.map(mapProductDtoToFrontend);
           
           // Group by category logically. 
           // In mockData.js, the categories were vegetables, fruits, meatSeafood, driedFood
           // Since backend might return actual category names like "Rau củ", "Trái cây", etc.,
           // We will dynamically create categories from the backend data
           const grouped = {};
           products.forEach(p => {
              const catName = p.category || 'Khác';
              if (!grouped[catName]) {
                  grouped[catName] = {
                      name: catName,
                      tabs: ['Tất cả'],
                      products: []
                  };
              }
              grouped[catName].products.push(p);

              // Add subcategory to tabs if not exists
              if (p.subcategory && !grouped[catName].tabs.includes(p.subcategory)) {
                  grouped[catName].tabs.push(p.subcategory);
              }
           });
           setCategorizedProducts(grouped);
        }
      } catch (err) {
        console.error("Home failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section with integrated search */}
        <HeroSection />

        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        ) : (
          Object.keys(categorizedProducts).map(categoryKey => {
            const cat = categorizedProducts[categoryKey];
            if (cat.products.length === 0) return null;
            return (
              <CategorySection
                key={categoryKey}
                title={cat.name}
                tabs={cat.tabs}
                products={cat.products}
              />
            );
          })
        )}
      </main>
      
      <Footer />
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  )
}

export default Home

