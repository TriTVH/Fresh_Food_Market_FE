<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
>>>>>>> tri
import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import HeroSection from '@components/home/HeroSection/HeroSection'
import CategorySection from '@components/home/CategorySection/CategorySection'
import FloatingChatButton from '@components/common/FloatingChatButton/FloatingChatButton'
<<<<<<< HEAD
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
=======
import { categories } from '@utils/mockData'
import { fetchActiveProductsByCategory } from '@/api/apiService'

function Home() {
  const [productsByCategory, setProductsByCategory] = useState({
    vegetables: [],
    fruits: [],
    meatSeafood: [],
    driedFood: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchActiveProductsByCategory()
        setProductsByCategory(data)
      } catch (err) {
        console.error(err)
        setError('Không tải được danh sách sản phẩm.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])
>>>>>>> tri

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <HeroSection />

<<<<<<< HEAD
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
=======
        {loading && (
          <div className="container mx-auto px-4 py-12 text-center">
            <style>{`@keyframes homeProductSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <div
              className="inline-flex text-primary-600"
              style={{ animation: 'homeProductSpin 0.9s linear infinite' }}
            >
              <FiLoader size={40} strokeWidth={2.5} />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="container mx-auto px-4 py-6 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <CategorySection
              title={categories.vegetables.name}
              tabs={categories.vegetables.tabs}
              products={productsByCategory.vegetables}
            />
            <CategorySection
              title={categories.fruits.name}
              tabs={categories.fruits.tabs}
              products={productsByCategory.fruits}
            />
            <CategorySection
              title={categories.meatSeafood.name}
              tabs={categories.meatSeafood.tabs}
              products={productsByCategory.meatSeafood}
            />
            <CategorySection
              title={categories.driedFood.name}
              tabs={categories.driedFood.tabs}
              products={productsByCategory.driedFood}
            />
          </>
>>>>>>> tri
        )}
      </main>

      <Footer />

      <FloatingChatButton />
    </div>
  )
}

export default Home
