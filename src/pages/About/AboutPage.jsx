import { FiCheckCircle } from 'react-icons/fi'
import { FaLeaf, FaHeart, FaTruck } from 'react-icons/fa'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-[#75b06f] to-[#5a9450]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Về Chúng Tôi</h1>
          <p className="text-xl text-white/90">Fresh Market - Tươi Ngon, An Toàn, Chất Lượng</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1648090229186-6188eaefcc6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZhcm0lMjBvcmdhbmljJTIwdmVnZXRhYmxlcyUyMHN0b3J5fGVufDF8fHx8MTc2ODM1Mzg1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farm Story"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Fresh Market được thành lập vào năm 2020 với sứ mệnh mang đến cho người tiêu dùng
                Việt Nam những sản phẩm thực phẩm tươi sống, sạch và an toàn nhất. Chúng tôi tin
                rằng mọi gia đình đều xứng đáng được thưởng thức những món ăn được chế biến từ
                nguyên liệu chất lượng cao.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Với hơn 3 năm kinh nghiệm, chúng tôi đã xây dựng được mạng lưới hợp tác với hơn
                100 trang trại và nhà cung cấp uy tín trên toàn quốc. Mỗi sản phẩm đều được chọn
                lọc kỹ càng, đảm bảo đạt tiêu chuẩn chất lượng cao nhất trước khi đến tay khách
                hàng.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi tự hào là cầu nối giữa nông dân và người tiêu dùng, góp phần phát triển
                nền nông nghiệp bền vững và nâng cao sức khỏe cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mb-6">
                <FiCheckCircle className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Chất Lượng Đảm Bảo</h3>
              <p className="text-gray-600">
                Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt, đảm bảo tươi ngon và an
                toàn tuyệt đối.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mb-6">
                <FaLeaf className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bền Vững</h3>
              <p className="text-gray-600">
                Cam kết bảo vệ môi trường, hỗ trợ nông nghiệp hữu cơ và phương pháp canh tác bền
                vững.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tận Tâm</h3>
              <p className="text-gray-600">
                Phục vụ khách hàng với sự tận tâm, chu đáo và luôn lắng nghe để cải thiện dịch vụ.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#75b06f]/10 rounded-full flex items-center justify-center mb-6">
                <FaTruck className="w-8 h-8 text-[#75b06f]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">
                Đội ngũ giao hàng chuyên nghiệp, đảm bảo sản phẩm được giao đến tay bạn trong thời
                gian ngắn nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#75b06f] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Trang Trại Đối Tác</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-lg opacity-90">Khách Hàng Tin Dùng</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Sản Phẩm Đa Dạng</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Hỗ Trợ Khách Hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Chúng tôi là một đội ngũ đam mê với sứ mệnh mang đến những sản phẩm tươi sống, chất
            lượng cao cho mọi gia đình Việt Nam. Với kinh nghiệm và tâm huyết, chúng tôi cam kết
            đồng hành cùng bạn trên hành trình chăm sóc sức khỏe cho gia đình.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutPage
