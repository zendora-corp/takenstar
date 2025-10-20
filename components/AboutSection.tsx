'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { STATS, MISN, ABOUT_TEXT } from '@/app/_data/home';

const iconMap: { [key: string]: any } = {
  Person: PersonIcon,
  EmojiEvents: EmojiEventsIcon,
  School: SchoolIcon,
};

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      id="about"
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
              mb: 2,
              color: 'text.primary',
            }}
          >
            About Takenstar Talent Search
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary',
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.8,
            }}
          >
            {ABOUT_TEXT}
          </Typography>
        </motion.div>

        <Typography
            variant="h4"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '2rem' },
              mb: 2,
              color: 'text.secondary',
            }}
          >
            Competition Groups
        </Typography>

        <Grid container spacing={4}>
          {STATS.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)',
                      border: '1px solid rgba(47, 85, 212, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(47, 85, 212, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 5 }}>
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
                          mb: 3,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: '#FFFFFF' }} />
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          fontWeight: 700,
                          color: 'primary.main',
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.1rem',
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
        <Typography
            variant="h4"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '2rem' },
              mb: 2,
              mt:5,
              color: 'text.secondary',
            }}
          >
            Our Mission
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          {MISN.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: 'flex' }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ flexGrow: 1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)',
                      border: '1px solid rgba(47, 85, 212, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(47, 85, 212, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 5 }}>
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
                          mb: 3,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: '#FFFFFF' }} />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.1rem',
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {stat.label}
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
