'use client';

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Chip,
  CardContent,
  Card,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Link from 'next/link';

const stats = [
  { icon: PeopleIcon, label: 'Certificate of Participation', value: '8,247' },
  { icon: TrendingUpIcon, label: 'Special mention for school-level toppers', value: '76.5%' }
];



export default function Stats() {
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 6,
              color: 'text.primary',
            }}
          >
            For All Participants
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
                      color: '#FFFFFF',
                    }}
                  >
                    <CardContent sx={{ py: 4 }}>
                      <IconComponent sx={{ fontSize: 50, mb: 2, opacity: 0.9 }} />
                      {/* <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography> */}
                      <Typography
                        variant="body1"
                        sx={{
                          opacity: 0.9,
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/results" passHref>
                <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.1rem',
                }}
                >
                Click here to check our Hall of Fame
                </Button>
            </Link>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
