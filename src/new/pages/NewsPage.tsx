import { Calendar, User, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    id: 1,
    title: "10 Loại Rau Củ Giàu Dinh Dưỡng Nhất Bạn Nên Ăn Hàng Ngày",
    excerpt:
      "Khám phá những loại rau củ giàu vitamin và khoáng chất giúp tăng cường sức khỏe và nâng cao hệ miễn dịch cho cả gia đình.",
    image:
      "https://images.unsplash.com/photo-1567306295427-94503f8300d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwbWFya2V0JTIwbmV3cyUyMGhlYWx0aHklMjBlYXRpbmd8ZW58MXx8fHwxNzY4MzUzODUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "15/01/2025",
    author: "Admin",
  },
  {
    id: 2,
    title: "Cách Chọn Trái Cây Tươi Ngon Và Bảo Quản Đúng Cách",
    excerpt:
      "Hướng dẫn chi tiết cách nhận biết trái cây tươi ngon và phương pháp bảo quản để giữ được độ tươi lâu nhất.",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjBtYXJrZXQlMjBmcmVzaHxlbnwxfHx8fDE3NjgzNTM4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "12/01/2025",
    author: "Bếp Nhà",
  },
  {
    id: 3,
    title: "Lợi Ích Của Thực Phẩm Hữu Cơ Đối Với Sức Khỏe",
    excerpt:
      "Tìm hiểu về những lợi ích tuyệt vời của thực phẩm hữu cơ và lý do tại sao bạn nên lựa chọn cho gia đình mình.",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZm9vZCUyMGhlYWx0aHl8ZW58MXx8fHwxNzY4MzUzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "10/01/2025",
    author: "Fresh Market",
  },
  {
    id: 4,
    title: "5 Món Salad Rau Củ Ngon Và Dễ Làm Cho Bữa Trưa",
    excerpt:
      "Chia sẻ công thức 5 món salad đơn giản, bổ dưỡng giúp bạn có bữa trưa nhẹ nhàng nhưng đầy đủ dinh dưỡng.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBib3dsfGVufDF8fHx8MTc2ODM1Mzg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "08/01/2025",
    author: "Nấu Ăn 24h",
  },
  {
    id: 5,
    title: "Thịt Bò Úc Nhập Khẩu: Phân Biệt Hàng Thật Và Hàng Giả",
    excerpt:
      "Hướng dẫn chi tiết cách nhận biết thịt bò Úc nhập khẩu chính hãng để tránh mua phải hàng kém chất lượng.",
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwbWVhdCUyMHJhdyUyMHF1YWxpdHl8ZW58MXx8fHwxNzY4MzUzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "05/01/2025",
    author: "Chợ Tốt",
  },
  {
    id: 6,
    title: "Hải Sản Tươi Sống: Bí Quyết Chế Biến Món Ngon",
    excerpt:
      "Khám phá những bí quyết chế biến hải sản tươi sống thành những món ăn thơm ngon, hấp dẫn cho cả nhà.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwZnJlc2glMjBtYXJrZXR8ZW58MXx8fHwxNzY4MzUzODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "03/01/2025",
    author: "Món Ngon Mỗi Ngày",
  },
];

export function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#75b06f] to-[#5a9450]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Tin Tức</h1>
          
        </div>
      </div>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {newsArticles[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {newsArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{newsArticles[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{newsArticles[0].author}</span>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-[#75b06f] font-semibold hover:gap-3 transition-all">
                  Đọc thêm
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Bài Viết Mới Nhất
          </h2>
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
                    <span className="px-3 py-1 bg-[#75b06f]/10 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#75b06f] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 text-[#75b06f] font-semibold hover:gap-3 transition-all">
                    Đọc thêm
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}