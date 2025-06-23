'use client';

import { useState } from 'react';

interface Service {
  title: string;
  icon: string;
  description: string;
  color: string;
  bgGradient: string;
}

const services: Service[] = [
  { 
    title: 'اسکان', 
    icon: '🏨', 
    description: 'بهترین محل های اقامت برای سفری راحت',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  { 
    title: 'پذیرایی', 
    icon: '🍽️', 
    description: 'تجربه طعم های بی نظیر غذاهای محلی',
    color: 'text-orange-600',
    bgGradient: 'from-orange-50 to-orange-100'
  },
  { 
    title: 'حمل و نقل', 
    icon: '🚗', 
    description: 'خدمات حمل و نقل ایمن و مطمئن',
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-green-100'
  },
  { 
    title: 'خدمات شهری', 
    icon: '🏙️', 
    description: 'راهنمایی کامل برای گشت در شهر',
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-purple-100'
  },
  { 
    title: 'بهداشتی', 
    icon: '🧼', 
    description: 'تضمین بهداشت و سلامتی در سفر',
    color: 'text-teal-600',
    bgGradient: 'from-teal-50 to-teal-100'
  },
  { 
    title: 'درمانی', 
    icon: '🏥', 
    description: 'دسترسی آسان به خدمات پزشکی',
    color: 'text-red-600',
    bgGradient: 'from-red-50 to-red-100'
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-10 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm border border-white/50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 cursor-pointer`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: hoveredIndex === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
            >
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></div>
              
              {/* Icon Container */}
              <div className={`relative mb-6 flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto group-hover:rotate-6`}>
                <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <h3 className={`text-xl font-bold ${service.color} group-hover:scale-105 transition-transform duration-300`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>
              </div>

              {/* Interactive Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              
              {/* Hover Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <span className="text-emerald-600 group-hover:scale-110 transition-transform duration-300">🚀</span>
            <span className="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors duration-300">
              آماده برای شروع هستید؟
            </span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}