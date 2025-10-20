'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

export default function AboutCTASection() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
              color: '#FFFFFF',
              boxShadow: '0 16px 48px rgba(47, 85, 212, 0.3)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ready to Begin Your Journey?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                mb: 4,
                opacity: 0.95,
                fontWeight: 400,
              }}
            >
              Register now and join thousands of students across India in this prestigious examination
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => router.push('/registration')}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Register Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/faqs')}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  '&:hover': {
                    borderColor: '#FFC107',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                View FAQs
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
