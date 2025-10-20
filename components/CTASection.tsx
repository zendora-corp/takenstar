'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link'; // ✅ Import Link

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box
      id="registration"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2F55D4 50%, #5C79EA 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)`,
          animation: 'gradientShift 8s ease infinite',
        },
        '@keyframes gradientShift': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: '#FFFFFF',
                mb: 2,
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              Ready to Showcase Your Talent?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 4,
                fontWeight: 400,
              }}
            >
              Join thousands of students competing for excellence and recognition
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/registration" passHref>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    boxShadow: '0 12px 32px rgba(255, 193, 7, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        boxShadow: '0 12px 32px rgba(255, 193, 7, 0.4)',
                      },
                      '50%': {
                        boxShadow: '0 12px 40px rgba(255, 193, 7, 0.6)',
                      },
                    },
                  }}
                >
                  Register for Free
                </Button>
              </Link>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
