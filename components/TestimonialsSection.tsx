'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TESTIMONIALS } from '@/app/_data/home';

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 6,
              color: 'text.primary',
            }}
          >
            Success Stories
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {TESTIMONIALS.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, x: -30, rotateY: -5 }}
                animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  rotateY: 2,
                  rotateX: -2,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: 'preserve-3d', height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FEFEFE 100%)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      background: 'linear-gradient(90deg, #FFC107 0%, #F4B400 100%)',
                      borderRadius: '16px 16px 0 0',
                    },
                  }}
                >
                  <CardContent sx={{ pt: 4, pb: 3, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 20, color: 'secondary.main' }} />
                      ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        mb: 3,
                        fontStyle: 'italic',
                        flexGrow: 1,
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'primary.main',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        {testimonial.class}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
