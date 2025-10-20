'use client';

import { Box } from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import RegistrationForm from '@/components/registration/RegistrationForm';
import ImportantDates from '@/components/registration/ImportantDates';

export default function RegistrationPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <NavigationBar />
      <Box >
        <RegistrationHeader />
        <RegistrationForm />
        <ImportantDates />
      </Box>
      <Footer />
    </Box>
  );
}
