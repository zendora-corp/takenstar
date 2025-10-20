'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { COUNTDOWN_DATES } from '@/app/_data/home';
import RegistrationCountdown from './RegistrationCountdown';

export default function RegistrationHeader() {
  const renderer = ({ days, hours, minutes, seconds }: any) => (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
      {[
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' },
      ].map((item, index) => (
        <Box key={index} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              color: '#0F172A',
              borderRadius: 2,
              px: { xs: 2, md: 3 },
              py: 2,
              minWidth: { xs: 60, md: 80 },
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {String(item.value).padStart(2, '0')}
          </Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              color: 'text.secondary',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
        color: '#FFFFFF',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Register for Takenstar 2025
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 5,
              opacity: 0.95,
            }}
          >
            Secure your spot in India's premier talent search examination
          </Typography>
          <RegistrationCountdown />
        </motion.div>
      </Container>
    </Box>
  );
}
