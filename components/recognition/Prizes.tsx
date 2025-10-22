'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const achievers = [
  { name: '₹12,000', class: '1st Prize', rank: 1, school: 'DPS, Delhi', score: 98 },
  { name: '₹8,400', class: '2nd Prize', rank: 2, school: 'KV, Mumbai', score: 97 },
  { name: '₹6,000', class: '3rd Prize', rank: 3, school: 'DAV, Bangalore', score: 96 },
];

const achievers2 = [
  { name: '₹12,000', class: '1st Prize', rank: 1, school: 'DPS, Delhi', score: 98 },
  { name: '₹8,400', class: '2nd Prize', rank: 2, school: 'KV, Mumbai', score: 97 },
  { name: '₹6,000', class: '3rd Prize', rank: 3, school: 'DAV, Bangalore', score: 96 },
];

export default function TopAchievers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#2F55D4';
  };

  return (
    <Box>
        <Box
            ref={ref}
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: '#FFFFFF',
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
                    Junior Scholar (Classes 6–8)
                </Typography>
                </motion.div>

                <Grid container spacing={3}>
                {achievers.map((achiever, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4}} key={index}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        style={{ height: '100%' }}
                    >
                        <Card
                        sx={{
                            height: '100%',
                            textAlign: 'center',
                            border: '2px solid',
                            borderColor: achiever.rank <= 3 ? getRankColor(achiever.rank) : 'divider',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'visible',
                            '&:hover': {
                            boxShadow: '0 12px 32px rgba(47, 85, 212, 0.2)',
                            },
                        }}
                        >
                        {achiever.rank <= 3 && (
                            <Box
                            sx={{
                                position: 'absolute',
                                top: -12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: getRankColor(achiever.rank),
                                borderRadius: '50%',
                                p: 1,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                            >
                            <EmojiEventsIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
                            </Box>
                        )}

                        <CardContent sx={{ pt: achiever.rank <= 3 ? 4 : 3, pb: 2 }}>
                            <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                margin: '0 auto',
                                mb: 1.5,
                                backgroundColor: 'primary.light',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                            }}
                            >
                            {achiever.name.charAt(0)}
                            </Avatar>
                            <Typography
                            variant="h6"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 0.5,
                            }}
                            >
                            {achiever.name}
                            </Typography>
                            <Typography
                            variant="body2"
                            sx={{
                                color: getRankColor(achiever.rank),
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 0.5,
                            }}
                            >
                            {achiever.class}
                            </Typography>
                        </CardContent>
                        </Card>
                    </motion.div>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </Box>
        <Box
            ref={ref}
            sx={{
                py: { xs: 2, md: 5 },
                backgroundColor: '#FFFFFF',
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
                    Senior Scholar (Classes 9–12)
                </Typography>
                </motion.div>

                <Grid container spacing={3}>
                {achievers.map((achiever, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4}} key={index}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        style={{ height: '100%' }}
                    >
                        <Card
                        sx={{
                            height: '100%',
                            textAlign: 'center',
                            border: '2px solid',
                            borderColor: achiever.rank <= 3 ? getRankColor(achiever.rank) : 'divider',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'visible',
                            '&:hover': {
                            boxShadow: '0 12px 32px rgba(47, 85, 212, 0.2)',
                            },
                        }}
                        >
                        {achiever.rank <= 3 && (
                            <Box
                            sx={{
                                position: 'absolute',
                                top: -12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: getRankColor(achiever.rank),
                                borderRadius: '50%',
                                p: 1,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                            >
                            <EmojiEventsIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
                            </Box>
                        )}

                        <CardContent sx={{ pt: achiever.rank <= 3 ? 4 : 3, pb: 2 }}>
                            <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                margin: '0 auto',
                                mb: 1.5,
                                backgroundColor: 'primary.light',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                            }}
                            >
                            {achiever.name.charAt(0)}
                            </Avatar>
                            <Typography
                            variant="h6"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 0.5,
                            }}
                            >
                            {achiever.name}
                            </Typography>
                            <Typography
                            variant="body2"
                            sx={{
                                color: getRankColor(achiever.rank),
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 0.5,
                            }}
                            >
                            {achiever.class}
                            </Typography>
                        </CardContent>
                        </Card>
                    </motion.div>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </Box>
    </Box>
  );
}
