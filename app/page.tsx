'use client';

import { Box } from '@mui/material';
import NavigationBar from '@/components/AppBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyParticipateSection from '@/components/WhyParticipateSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <WhyParticipateSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
      <ScrollToTop />
    </Box>
  );
}
