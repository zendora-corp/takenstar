'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MissionVisionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            About Takenstar Talent Search
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'text.secondary',
              mb: 8,
              fontWeight: 400,
            }}
          >
            The Takenstar Talent Search Exam (TTSE) is a flagship scholarship initiative of Takenstar Education & Technology, dedicated to nurturing young talent across Assam. We believe that every student has unique potential, and through this program, we aim to recognize, encourage, and reward academic excellence.
By organizing this talent search for Classes 6 to 12, we provide a platform where students can test their knowledge, build confidence, and compete in a healthy learning environment. Winners are honored with cash prizes and certificates, while every participant is acknowledged for their effort and dedication.
At Takenstar Education & Technology, our mission goes beyond academics — we strive to inspire students, empower schools, and build a culture of learning where hard work and talent are celebrated.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: '100%' }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
                  color: '#FFFFFF',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <TrackChangesIcon sx={{ fontSize: 40, color: '#FFC107' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                      opacity: 0.95,
                    }}
                  >
                    Our mission is to discover and nurture young talent by providing students of Classes 6 to 12 with a fair platform to showcase their knowledge and skills. We aim to build confidence, promote healthy competition, and reward academic excellence through scholarships and recognition.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: '100%' }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #FFC107 0%, #F4B400 100%)',
                  color: '#0F172A',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(47, 85, 212, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 40, color: '#2F55D4' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                      opacity: 0.9,
                    }}
                  >
                    Our vision is to create a future-ready generation of learners in Assam who are confident, skilled, and motivated to achieve their goals. By encouraging curiosity and critical thinking at an early stage, we strive to make Takenstar Talent Search Exam a trusted benchmark for student growth and achievement.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
