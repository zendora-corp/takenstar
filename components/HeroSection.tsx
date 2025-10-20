'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { getActiveExamYear, type ExamYear } from '@/lib/api';
import Link from 'next/link';

const CountdownCard = ({ title, date }: { title: string; date: Date }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, fontSize: '0.9rem' }}>
              {title} - Completed!
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Mins' },
              { value: seconds, label: 'Secs' },
            ].map((item, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                    borderRadius: 2,
                    px: { xs: 1.5, md: 2 },
                    py: 1.5,
                    minWidth: { xs: 45, md: 60 },
                    fontWeight: 700,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {String(item.value).padStart(2, '0')}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return <Countdown date={date} renderer={renderer} />;
};

export default function HeroSection() {
  const [examYear, setExamYear] = useState<ExamYear | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<{ title: string; date: Date }[]>([]);

  useEffect(() => {
    async function loadExamYear() {
      try {
        const data = await getActiveExamYear();
        setExamYear(data);

        const now = new Date();
        const regOpenDate = new Date(data.registrationOpenDate);
        const regCloseDate = new Date(data.registrationCloseDate);
        const examDate = new Date(data.examDate);
        const resultDate = new Date(data.resultDate);

        const activeCountdowns: { title: string; date: Date }[] = [];

        if (now < regOpenDate) {
          activeCountdowns.push({ title: 'Registration Opens In', date: regOpenDate });
          activeCountdowns.push({ title: 'Exam Date', date: examDate });
        } else if (now >= regOpenDate && now < regCloseDate) {
          activeCountdowns.push({ title: 'Registration Closes In', date: regCloseDate });
          activeCountdowns.push({ title: 'Exam Date', date: examDate });
        } else if (now >= regCloseDate && now < examDate) {
          activeCountdowns.push({ title: 'Next Exam In', date: examDate });
          activeCountdowns.push({ title: 'Result Date', date: resultDate });
        } else if (now >= examDate && now < resultDate) {
          activeCountdowns.push({ title: 'Result Declaration In', date: resultDate });
        }

        setCountdowns(activeCountdowns);
      } catch (err) {
        console.error('Failed to load exam year', err);
      } finally {
        setLoading(false);
      }
    }
    loadExamYear();
  }, []);

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0B1D48 0%, #1E3A8A 50%, #2F55D4 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          filter: 'blur(2px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(11, 29, 72, 0.7), rgba(30, 58, 138, 0.5))',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#FFFFFF',
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                  textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                Takenstar Talent Search Exam {examYear?.year || '2025'} – Unlock Your Potential
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: 700,
                }}
              >
                A regional talent search exam for Classes 6 to 12, organized across schools in Assam, with two
                competition groups and exciting cash prizes.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 6,
                }}
              >
                <Link href="/registration" passHref>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 24px rgba(255, 193, 7, 0.4)',
                    }}
                  >
                    Register Now
                  </Button>
                </Link>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            >
              {loading ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CircularProgress sx={{ color: '#FFFFFF' }} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {countdowns.length > 0 ? (
                    countdowns.map((countdown, index) => (
                      <CountdownCard key={index} title={countdown.title} date={countdown.date} />
                    ))
                  ) : (
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          Stay tuned for upcoming exam announcements!
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
