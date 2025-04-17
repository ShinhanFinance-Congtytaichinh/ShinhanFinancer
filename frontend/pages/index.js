import Head from 'next/head';
import Menu from '../components/Menu';
import LoanForm from '../components/LoanForm';
import LiveChat from '../components/LiveChat';

export default function Home({ testimonials }) {
  return (
    <div className="bg-gray-100 font-roboto">
      <Head>
        <title>Shinhan Finance - Vay Nhanh</title>
        <meta name="description" content="Shinhan Finance - Vay tiêu dùng, thẻ tín dụng, lãi suất thấp, duyệt nhanh 60 giây" />
        <meta name="keywords" content="vay tiêu dùng, thẻ tín dụng, Shinhan Finance, vay nhanh" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Menu */}
      <Menu />

      {/* Hero */}
      <section className="banner h-[600px] bg-cover bg-center flex items-center justify-center text-center md:text-left" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,64,128,0.8), rgba(255,255,255,0.2)), url('/hero.jpg')` }}>
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center px-4">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Vay dễ dàng, lãi nhẹ nhàng</h1>
            <p className="text-lg text-white mb-6">Duyệt nhanh trong 60 giây, hỗ trợ nợ xấu, lãi suất từ 6.5%.</p>
            <button onClick={() => document.querySelector('#register-form').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800" data-event="click_hero_cta">Đăng ký ngay</button>
          </div>
          <img src="/banner.jpg" alt="Vay nhanh" className="w-full md:w-1/3 rounded-lg" loading="lazy" />
        </div>
      </section>

      {/* Loan Form */}
      <LoanForm />

      {/* Testimonial */}
      <section className="testimonials container mx-auto max-w-6xl py-8">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">Đồng hành cùng Shinhan Finance</h2>
        <div className="slider">
          <div className="slider-container flex">
            {testimonials.map((item, index) => (
              <div key={index} className="slider-item grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-700 mb-4">{item.quote}</p>
                  <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <p className="font-bold text-blue-900">{item.author}</p>
                  <p className="text-sm italic text-gray-600">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="text-2xl text-blue-900 mx-2" data-slider-prev>&lt;</button>
          <button className="text-2xl text-blue-900 mx-2" data-slider-next>&gt;</button>
        </div>
      </section>

      {/* Awards */}
      <section className="awards container mx-auto max-w-6xl py-8">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">Giải thưởng & Bằng khen</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/award1.jpg" alt="Top 10 Công ty Tài chính 2024" className="w-24 mx-auto mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-blue-900">Top 10 Công ty Tài chính 2024</h3>
            <p className="text-gray-600 text-sm">Được vinh danh bởi Hiệp hội Tài chính Việt Nam.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/award2.jpg" alt="Dịch vụ Khách hàng Xuất sắc 2023" className="w-24 mx-auto mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-blue-900">Dịch vụ Khách hàng Xuất sắc 2023</h3>
            <p className="text-gray-600 text-sm">Trao bởi Tạp chí Tài chính Quốc tế.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/award3.jpg" alt="Sáng tạo Tài chính 2022" className="w-24 mx-auto mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-blue-900">Sáng tạo Tài chính 2022</h3>
            <p className="text-gray-600 text-sm">Công nhận bởi Ngân hàng Nhà nước Việt Nam.</p>
          </div>
        </div>
      </section>

      {/* Live Chat */}
      <LiveChat />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-4 gap-8 px-4">
          <div>
            <img src="/logo.png" alt="Shinhan Finance Logo" className="h-12 mb-4" />
            <p className="text-sm">Giải pháp tài chính Hàn Quốc, minh bạch, an toàn.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <p className="text-sm">Email: <a href="mailto:support@shinhanfinance.com.vn" className="hover:text-blue-300">support@shinhanfinance.com.vn</a></p>
            <p className="text-sm">Hotline: <a href="tel:19001577" className="hover:text-blue-300">1900 1577</a></p>
            <p className="text-sm">Địa chỉ: TP.HCM, Việt Nam</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Link nhanh</h3>
            <ul className="text-sm">
              <li><a href="#loans" className="hover:text-blue-300">Sản phẩm</a></li>
              <li><a href="#services" className="hover:text-blue-300">Dịch vụ</a></li>
              <li><a href="#policy" className="hover:text-blue-300">Chính sách</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Kết nối</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-900 hover:bg-gray-200" aria-label="Facebook">F</a>
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-900 hover:bg-gray-200" aria-label="YouTube">Y</a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-8">© 2025 Shinhan Finance</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Fake testimonials (replace with MongoDB query)
  const testimonials = [
    { quote: 'MoMo và Shinhan Finance hợp tác mang giá trị thiết thực.', author: 'Mr. Bui Nhat Sang', company: 'MoMo' },
    { quote: 'VNPAY đồng hành cùng Shinhan Finance, chúc mừng 5 năm.', author: 'Ms. Vo Thi Cam Nhung', company: 'VNPAY' },
    { quote: 'Nguyễn Kim và Shinhan Finance mang trải nghiệm tài chính minh bạch.', author: 'Ms. Phan Thi Cam Tu', company: 'Nguyen Kim' },
  ];
  return { props: { testimonials } };
}