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
import FAQ from '@/components/FAQ';
import Prizes from '@/components/recognition/Prizes';
import Stats from '@/components/Stats';

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
      <Stats />
      <Prizes />
      <FAQ />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </Box>
  );
}
