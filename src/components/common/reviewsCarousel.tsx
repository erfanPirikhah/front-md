import { useState, useEffect } from 'react';

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    { id: 1, avatar: "👨‍💼", name: "علی محمدی", comment: "تجربه‌ای فوق‌العاده با مدد داشتم! خدمات با کیفیت و پشتیبانی عالی." },
    { id: 2, avatar: "👩‍💻", name: "سارا احمدی", comment: "سامانه بسیار کاربرپسند و خدمات متنوعی ارائه می‌دهد. حتماً پیشنهاد می‌کنم!" },
    { id: 3, avatar: "👨‍🔧", name: "رضا کاظمی", comment: "از سرعت و دقت در ارائه خدمات واقعاً راضی بودم. تیم حرفه‌ای و متعهد." },
    { id: 4, avatar: "👩‍🎓", name: "مریم حسینی", comment: "مدد تجربه‌ای متفاوت از سفر برای من رقم زد. همه چیز عالی بود!" },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#059669', marginBottom: '1rem' }}>
          نظرات کاربران
        </h2>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: '#d1fae5', 
          color: '#059669', 
          padding: '0.5rem 1rem', 
          borderRadius: '9999px', 
          fontSize: '0.875rem', 
          fontWeight: '500' 
        }}>
          <span>⭐ 4.9</span>
          <span>•</span>
          <span>{reviews.length} نظر</span>
        </div>
      </div>

      {/* Carousel Container */}
      <div style={{ position: 'relative', backgroundColor: '#f0fdf4', borderRadius: '1.5rem', padding: '2rem' }}>
        {/* Current Review Display */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '3rem 2rem', 
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Quote Icon */}
            <div style={{ fontSize: '4rem', color: '#d1fae5', marginBottom: '1rem' }}>
              "
            </div>
            
            {/* Comment */}
            <p style={{ 
              fontSize: '1.5rem', 
              color: '#374151', 
              lineHeight: '1.75', 
              marginBottom: '2rem', 
              fontWeight: '500'
            }}>
              {reviews[currentIndex].comment}
            </p>
            
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: 'linear-gradient(to bottom right, #10b981, #059669)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                {reviews[currentIndex].avatar}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                  {reviews[currentIndex].name}
                </div>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', fontSize: '0.875rem' }}>
                  {'⭐'.repeat(5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            color: '#374151',
            border: 'none',
            borderRadius: '50%',
            padding: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontSize: '1.25rem',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f9fafb';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ←
        </button>
        
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            color: '#374151',
            border: 'none',
            borderRadius: '50%',
            padding: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontSize: '1.25rem',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f9fafb';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          →
        </button>
      </div>

      {/* Progress Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', gap: '1.5rem' }}>
        {/* Slide Counter */}
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          backgroundColor: '#f3f4f6', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '9999px' 
        }}>
          {currentIndex + 1} از {reviews.length}
        </div>
        
        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                height: '0.75rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: index === currentIndex ? '#059669' : '#d1d5db',
                width: index === currentIndex ? '2rem' : '0.75rem',
                boxShadow: index === currentIndex ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#d1d5db';
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Auto-play Control */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#6b7280';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9ca3af';
          }}
        >
          {isAutoPlaying ? '⏸️ توقف خودکار' : '▶️ شروع خودکار'}
        </button>
      </div>
    </div>
  );
}