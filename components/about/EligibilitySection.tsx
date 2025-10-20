'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import BadgeIcon from '@mui/icons-material/Badge';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const criteria = [
  {
    icon: SchoolIcon,
    title: 'Class Requirement',
    description: 'Open for students of Classes 6 to 12.',
  },
  {
    icon: PublicIcon,
    title: 'One-Time Registration',
    description: 'Students must complete the online/offline registration process before the deadline.',
  },
  {
    icon: BadgeIcon,
    title: 'Fair Participation',
    description: 'Only individual participation is allowed — no group entries.',
  },
  {
    icon: AutorenewIcon,
    title: 'Reapply Every Year',
    description: 'Students can take part every year to showcase their growth.',
  },
];

export default function EligibilitySection() {
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
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Eligibility Criteria
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              mb: 6,
            }}
          >
            Check if you meet the requirements to participate
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {criteria.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid',
                      borderColor: 'primary.light',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(47, 85, 212, 0.2)',
                        borderColor: 'secondary.main',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 4, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          mb: 2.5,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: '#FFFFFF' }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.05rem',
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
