import { useState, useEffect } from 'react'
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { fetchPublishedNews } from '@/api/newsApi'
import { mapNewsDtoToFrontend } from '@/utils/mapper'

function NewsPage() {
  const [newsArticles, setNewsArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetchPublishedNews();
        if (response && response.success && response.data) {
          setNewsArticles(response.data.map(mapNewsDtoToFrontend));
        }
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setIsLoading(false)
      }
    };
    loadNews();
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#75b06f] to-[#5a9450]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Tin Tức</h1>
          <p className="text-xl text-white/90">Cập nhật kiến thức và mẹo hay về thực phẩm</p>
        </div>
      </div>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {!isLoading && newsArticles.length > 0 && (
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-[400px]">
                  <img
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-sm text-[#75b06f] font-semibold mb-4">
                    <span className="px-3 py-1 bg-[#75b06f]/10 rounded-full">
                      {newsArticles[0].category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{newsArticles[0].title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{newsArticles[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>{newsArticles[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUser className="w-4 h-4" />
                      <span>{newsArticles[0].author}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 text-[#75b06f] font-semibold hover:gap-3 transition-all">
                    Đọc thêm
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Bài Viết Mới Nhất</h2>
          {isLoading ? (
             <div className="py-20 text-center text-gray-500">Đang tải tin tức...</div>
          ) : newsArticles.length <= 1 ? (
             <div className="py-20 text-center text-gray-500">Chưa có bài viết mới nào khác.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="h-[240px] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 text-sm text-[#75b06f] font-semibold mb-3">
                      <span className="px-3 py-1 bg-[#75b06f]/10 rounded-full">{article.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#75b06f] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 text-[#75b06f] font-semibold hover:gap-3 transition-all">
                      Đọc thêm
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default NewsPage
