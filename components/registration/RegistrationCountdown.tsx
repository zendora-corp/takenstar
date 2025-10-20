'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Countdown from 'react-countdown';
import { getActiveExamYear, type ExamYear } from '@/lib/api';

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
            <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600, fontSize: '1rem' }}>
              Registration has been closed!
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
            {[{ value: days, label: 'Days' }, { value: hours, label: 'Hours' }, { value: minutes, label: 'Mins' }, { value: seconds, label: 'Secs' }].map((item, index) => (
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
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary', fontSize: '0.75rem', fontWeight: 500 }}>
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

export default function RegistrationCountdown() {
  const [examYear, setExamYear] = useState<ExamYear | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExamYear() {
      try {
        const data = await getActiveExamYear();
        setExamYear(data);

        const now = new Date();
        const regOpenDate = new Date(data.registrationOpenDate);
        const regCloseDate = new Date(data.registrationCloseDate);

        if (now < regOpenDate) {
          setTitle('Registration Opens In');
          setTargetDate(regOpenDate);
        } else if (now >= regOpenDate && now < regCloseDate) {
          setTitle('Registration Closes In');
          setTargetDate(regCloseDate);
        } else {
          setTitle('Registration has been closed');
          setTargetDate(null);
        }
      } catch (err) {
        console.error('Error loading exam year:', err);
      } finally {
        setLoading(false);
      }
    }
    loadExamYear();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2">Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!targetDate) {
    return (
      <Card sx={{ background: 'rgba(255,255,255,0.95)', borderRadius: 3 }}>
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>
            Registration has been closed
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return <CountdownCard title={title} date={targetDate} />;
}
