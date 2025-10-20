'use client';

import { Box } from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import JourneySection from '@/components/about/JourneySection';
import EligibilitySection from '@/components/about/EligibilitySection';
import ExamFormatSection from '@/components/about/ExamFormatSection';
import AboutCTASection from '@/components/about/AboutCTASection';

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <NavigationBar />
      <Box >
        <MissionVisionSection />
        {/* <JourneySection /> */}
        <EligibilitySection />
        {/* <ExamFormatSection /> */}
        <AboutCTASection />
      </Box>
      <Footer />
    </Box>
  );
}
