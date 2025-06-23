'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('TOKEN');
    setIsAuthenticated(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    router.push('/user');
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className={`w-full py-4 px-4 sm:px-8 flex justify-between items-center fixed top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/20'
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        }`}>

        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">پ</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              مدد
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {['میهمان', 'میزبان', 'توضیحات', 'دونیت', 'ارتباط با ما'].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="relative px-4 py-2 text-gray-700 font-medium rounded-full transition-all duration-300 hover:text-emerald-600 group overflow-hidden"
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Login/Logout Button and Mobile Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden md:block relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 border-0 outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              <span className="relative z-10 block">خروج</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300"></div>
            </button>
          ) : (
            <Link href="/login" className="hidden md:block">
              <button className="relative px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 border-0 outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">
                <span className="relative z-10 block">ورود</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300"></div>
              </button>
            </Link>
          )}

          {/* Hamburger Menu */}
          <button
            aria-label="بازکردن منو"
            className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 flex flex-col justify-center items-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
            <span className={`block w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`} />
            <span className={`block w-5 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 right-0 lg:hidden transition-all duration-500 ease-out ${mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
          <nav className="mx-4 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
            <div className="flex flex-col gap-2">
              {['میهمان', 'میزبان', 'توضیحات', 'دونیت', 'ارتباط با ما'].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative px-4 py-3 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:text-emerald-600 group overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200/50">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white! font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 border-0 outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <span className="block">خروج</span>
                  </button>
                ) : (
                  <Link href="/user/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white! font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 border-0 outline-none focus:ring-2 focus:ring-emerald-400">
                      <span className="block">ورود</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">{children}</main>
    </div>
  );
}