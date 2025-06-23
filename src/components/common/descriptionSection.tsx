'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Description {
  img: string;
  alt: string;
  title: string;
  text: string;
  category: string;
  stats: string;
}

interface TimelineItem {
  step: number;
  title: string;
  icon: string;
  description: string;
  color: string;
}

const descriptions: Description[] = [
  {
    img: "/images/carousel-1.jpg",
    alt: "خدمات اسکان و پذیرایی",
    title: "خدمات اسکان و پذیرایی",
    text: "تجربه‌ای منحصر به فرد از اقامت در بهترین مکان‌ها با خدمات پذیرایی درجه یک که همواره در خاطرتان باقی خواهد ماند.",
    category: "اسکان",
    stats: "+۱۰۰ مکان"
  },
  {
    img: "/images/carousel-1.jpg",
    alt: "خدمات حمل و نقل",
    title: "حمل و نقل هوشمند",
    text: "سیستم حمل و نقل پیشرفته با امکانات مدرن و راننده‌های مجرب برای سفری ایمن و راحت در تمام مسیرهای شهری و بین‌شهری.",
    category: "حمل و نقل",
    stats: "۲۴/۷ فعال"
  },
  {
    img: "/images/carousel-1.jpg",
    alt: "خدمات بهداشتی",
    title: "مراقبت‌های بهداشتی",
    text: "خدمات بهداشتی و درمانی با بالاترین استانداردهای بین‌المللی، همراه با کادر مجرب و تجهیزات پیشرفته.",
    category: "بهداشت",
    stats: "۱۰۰٪ ایمن"
  },
  {
    img: "/images/carousel-1.jpg",
    alt: "خدمات شهری",
    title: "خدمات شهری جامع",  
    text: "راهنمایی کامل شهری، خدمات فرهنگی و تفریحی متنوع که شهر را برای شما به یک تجربه زنده و پویا تبدیل می‌کند.",
    category: "شهری",
    stats: "+۵۰ خدمت"
  },
];

const timeline: TimelineItem[] = [
  { 
    step: 1, 
    title: 'اعلام آمادگی خیر', 
    icon: '🤝', 
    description: 'خیرین با ثبت آمادگی خود، بستری امن برای ارائه خدمات ایجاد می‌کنند.',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    step: 2, 
    title: 'ثبت نیاز', 
    icon: '📝', 
    description: 'افراد نیازمند با سادگی و سرعت نیازهای خود را در سامانه ثبت می‌کنند.',
    color: 'from-emerald-500 to-green-500'
  },
  { 
    step: 3, 
    title: 'تطبیق هوشمند', 
    icon: '🔍', 
    description: 'سیستم هوشمند ما بهترین تطبیق بین نیازها و خدمات را انجام می‌دهد.',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    step: 4, 
    title: 'ارائه خدمت', 
    icon: '✅', 
    description: 'خدمات با کیفیت ارائه شده و بازخورد توسط طرفین ثبت می‌شود.',
    color: 'from-orange-500 to-red-500'
  },
];

export default function DescriptionSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-10 mb-20 space-y-24">
      
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 px-6 py-3 rounded-full border border-emerald-200/50">
          <span className="text-emerald-600">🌟</span>
          <span className="text-sm font-medium text-emerald-700">درباره خدمات ما</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 bg-clip-text text-transparent">
          تجربه‌ای بی‌نظیر
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          سامانه ما با ترکیب فناوری پیشرفته و خدمات انسانی، دنیای جدیدی از امکانات را پیش روی شما قرار می‌دهد
        </p>
      </div>

      {/* Description Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {descriptions.map((item, index) => (
          <article
            key={index}
            className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
              activeCard === index ? 'scale-105 shadow-2xl' : ''
            }`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200/50">
                {item.category}
              </div>
              
              {/* Stats Badge */}
              <div className="absolute bottom-4 left-4 bg-emerald-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white">
                {item.stats}
              </div>
            </div>

            {/* Content */}
            <div className="relative p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {item.text}
              </p>
              
              {/* Action Button */}
              <div className="pt-4">
                <button className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-300 group/btn">
                  <span>بیشتر بدانید</span>
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">←</span>
                </button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </article>
        ))}
      </div>

      {/* How it Works Section */}
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 rounded-3xl"></div>
        {/* Pattern Background - مشکل حل شده */}
        <div className="absolute inset-0 rounded-3xl"
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        <div className="relative p-8 sm:p-12 text-white">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
              نحوه عملکرد مدد
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              فرآیند ساده و هوشمند ما در ۴ مرحله
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div
                key={item.step}
                className="relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connecting Line */}
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent"></div>
                )}
                
                {/* Step Card */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link href="/contribute">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 group">
                <span>🚀</span>
                <span>همین حالا شروع کنید</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">←</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="flex justify-center items-center gap-6">
        {timeline.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-300 hover:scale-150 ${
              index === 1 ? 'scale-125' : ''
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}