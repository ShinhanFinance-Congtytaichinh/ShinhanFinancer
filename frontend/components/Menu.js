import { useState } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-900 text-white py-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4 max-w-6xl">
        <a href="/" aria-label="Shinhan Finance Home">
          <img src="/logo.png" alt="Shinhan Finance Logo" className="h-12" />
        </a>
        <button className="hamburger md:hidden cursor-pointer" aria-label="Toggle Menu" onClick={toggleMenu}>
          <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <nav className={`menu-items ${isOpen ? 'block' : 'hidden'} md:flex space-x-8 text-lg absolute md:static top-16 left-0 w-full md:w-auto bg-blue-900 md:bg-transparent`}>
          <a href="#home" className="block md:inline-block hover:text-blue-300 p-2">Trang chủ</a>
          <a href="#loans" className="block md:inline-block hover:text-blue-300 p-2">Vay tiêu dùng</a>
          <a href="#cards" className="block md:inline-block hover:text-blue-300 p-2">Thẻ tín dụng</a>
          <a href="#promotions" className="block md:inline-block hover:text-blue-300 p-2">Khuyến mãi</a>
          <a href="#about" className="block md:inline-block hover:text-blue-300 p-2">Giới thiệu</a>
          <a href="#contact" className="block md:inline-block hover:text-blue-300 p-2">Liên hệ</a>
        </nav>
        <div className="auth-buttons hidden md:flex space-x-4">
          <button className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-200">Đăng nhập</button>
          <button className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-200">Đăng ký</button>
        </div>
      </div>
    </header>
  );
}