
'use client';


import DescriptionSection from '@/components/common/descriptionSection';
import FooterSection from '@/components/common/footerSection';
import HeroCarousel from '@/components/common/heroCarousel';
import ReviewsCarousel from '@/components/common/reviewsCarousel';
import ServicesSection from '@/components/common/servicesSection';

export default function UserLandingPage() {
  return (
    <>
      {/* Carousel */}
      <HeroCarousel />

      {/* Services */}
      <ServicesSection />

      {/* Description */}
      <DescriptionSection />

      {/* User Reviews */}
      <ReviewsCarousel />

      {/* Footer */}
      <FooterSection />
    </>
  );
}