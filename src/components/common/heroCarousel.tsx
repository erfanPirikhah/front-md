'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';

interface CarouselItemData {
  img: string;
  alt: string;
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  gradient?: string;
}

const carouselItems: CarouselItemData[] = [
  {
    img: "/images/carousel-1.jpg",
    alt: "تصویر جدید",
    title: "تجربه‌ای نوین با مدد",
    subtitle: "دنیای جدیدی از امکانات را کشف کنید",
    cta: "اكنون کاوش کنید",
    href: "/explore",
    gradient: "from-emerald-600/40 via-emerald-500/20 to-transparent"
  },
  // {
  //   img: "/images/carousel-1.jpg",
  //   alt: "خدمات خیریه",
  //   title: "با مدد به دیگران کمک کنید",
  //   subtitle: "همراه ما باشید و تغییر مثبت ایجاد کنید",
  //   cta: "مشارکت کنید",
  //   href: "/contribute",
  //   gradient: "from-blue-600/40 via-blue-500/20 to-transparent"
  // },
//   {
//     img: "/images/carousel-3.jpg",
//     alt: "خدمات گردشگری",
//     title: "سفر رویایی خود را بسازید",
//     subtitle: "به مقاصد بی‌نظیر سفر کنید",
//     cta: "رزرو کنید",
//     href: "/user/register",
//     gradient: "from-purple-600/40 via-purple-500/20 to-transparent"
//   },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle carousel autoplay
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  // Update carousel slide index
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    if (api) api.scrollTo(index);
  }, [api]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-8 mb-16">
      {/* Mobile Header (visible on small screens) */}
      <div className="block lg:hidden mb-8">
        <div className="text-center bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-6 border border-slate-200/50 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-3">
            خدمات ما
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
            مجموعه کاملی از خدمات برای تجربه‌ای فراموش‌نشدنی
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Carousel Section */}
        <div 
          className="w-full lg:w-3/4 relative overflow-hidden rounded-3xl shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            opts={{ loop: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {carouselItems.map(({ img, alt, title, subtitle, cta, href, gradient }, index) => (
                <CarouselItem 
                  key={index} 
                  className="relative transition-opacity duration-500 ease-in-out"
                >
                  <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 75vw"
                      priority={index === 0}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient || 'from-black/40 via-black/20 to-transparent'}`}></div>
                    
                    {/* Geometric Pattern Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="max-w-2xl space-y-6">
                          {/* Animated Badge */}
                          <div className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium border border-white/20 transition-all duration-700 ${
                            current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }`}>
                            <Play className="w-4 h-4" />
                            <span>جدید</span>
                          </div>
                          
                          {/* Main Title */}
                          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight transition-all duration-700 ${
                            current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }`}>
                            {title}
                          </h1>
                          
                          {/* Subtitle */}
                          {subtitle && (
                            <p className={`text-lg sm:text-xl text-white/90 leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
                              current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}>
                              {subtitle}
                            </p>
                          )}
                          
                          {/* CTA Button */}
                          <div className={`transition-all duration-700 delay-400 ${
                            current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }`}>
                            <Link href={href}>
                              <button className="group/btn relative overflow-hidden bg-white text-gray-900 font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <span className="relative z-10 flex items-center gap-2">
                                  {cta}
                                  <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="left-6 w-12 h-12 bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-6 h-6" />
            </CarouselPrevious>
            <CarouselNext className="right-6 w-12 h-12 bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-6 h-6" />
            </CarouselNext>
          </Carousel>
          
          {/* Modern Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`relative transition-all duration-500 ${
                  current === index 
                    ? 'w-12 h-3 bg-white rounded-full' 
                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`برو به اسلاید ${index + 1}`}
              >
                {current === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/80 to-emerald-500/80 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-6000 ease-linear"
              style={{ 
                width: isHovered ? '0%' : '100%',
                transitionDuration: isHovered ? '0s' : '6s'
              }}
            ></div>
          </div>
        </div>

        {/* Desktop Header Section (visible on large screens) */}
        <div className="hidden lg:flex w-full lg:w-1/4 items-center justify-center">
          <div className="text-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl p-8 border border-slate-200/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 group/header h-full flex flex-col justify-center min-h-[400px]">
            {/* Icon with animation */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg group-hover/header:scale-110 transition-transform duration-500 mx-auto">
              <Sparkles className="w-10 h-10 text-white group-hover/header:rotate-12 transition-transform duration-500" />
            </div>
            
            {/* Title */}
            <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-4 leading-tight">
              خدمات ما
            </h2>
            
            {/* Description */}
            <p className="text-sm xl:text-base 2xl:text-lg text-gray-600 leading-relaxed mb-6 px-2">
              مجموعه کاملی از خدمات برای تجربه‌ای فراموش‌نشدنی و منحصر به فرد
            </p>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 mx-auto rounded-full group-hover/header:w-32 transition-all duration-500"></div>
            
            {/* Additional decorative elements */}
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-3 h-3 bg-emerald-400/60 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        .carousel-item {
          transition: opacity 0.7s ease-in-out;
        }
        
        .carousel-item.active {
          opacity: 1;
        }
        
        .carousel-item:not(.active) {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}