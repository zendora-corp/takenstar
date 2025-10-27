'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FEATURES } from '@/app/_data/home';

const iconMap: { [key: string]: any } = {
  CardGiftcard: CardGiftcardIcon,
  Certificate: WorkspacePremiumIcon,
  EmojiEvents: EmojiEventsIcon,
  TrendingUp: TrendingUpIcon,
};

export default function WhyParticipateSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#FFFFFF',
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
            Why Participate?
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                      backgroundColor: 'background.paper',
                      border: '1px solid rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 16px 40px rgba(47, 85, 212, 0.2)',
                        borderColor: 'primary.light',
                      },
                      '&:focus-visible': {
                        outline: '2px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: 2,
                      },
                    }}
                    tabIndex={0}
                  >
                    <CardContent sx={{ py: 4, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 193, 7, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          mb: 2.5,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 36, color: 'secondary.main' }} />
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
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.95rem',
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
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
