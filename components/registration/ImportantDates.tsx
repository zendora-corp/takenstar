'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const dates = [
  { event: 'Registration Opens', date: '01/10/2025' },
  { event: 'Registration Closes', date: '28/10/2025' },
  { event: 'Exam Date', date: '02/11/2025' },
  { event: 'Result Announcement', date: '16/11/2025' },
];

export default function ImportantDates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 5,
            }}
          >
            Important Dates
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {dates.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)',
                    border: '1px solid',
                    borderColor: 'primary.light',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(47, 85, 212, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <CalendarTodayIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                      }}
                    >
                      {item.event}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.05rem',
                        color: 'primary.main',
                        fontWeight: 500,
                      }}
                    >
                      {item.date}
                    </Typography>
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
