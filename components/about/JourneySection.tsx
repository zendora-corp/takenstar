'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const milestones = [
  { year: '2008', title: 'Founded', description: 'Established with mission to provide equal opportunities' },
  { year: '2012', title: 'First 10K Students', description: 'Reached our first major milestone' },
  { year: '2016', title: '₹1 Crore Scholarships', description: 'Distributed over ₹1 crore in scholarships' },
  { year: '2020', title: 'Digital Transformation', description: 'Fully online examination platform launched' },
  { year: '2025', title: '50K+ Students', description: 'Over 50,000 students and ₹5 crores in scholarships' },
];

export default function JourneySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#FFFFFF',
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
            Our Journey
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              mb: 8,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            From humble beginnings to becoming India's premier talent search platform
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', py: 4 }}>
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 20, md: '50%' },
              top: 0,
              bottom: 0,
              width: 3,
              backgroundColor: 'primary.light',
              transform: { md: 'translateX(-50%)' },
            }}
          />

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  alignItems: 'center',
                  mb: 6,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    flex: { xs: 0, md: 1 },
                    textAlign: { md: index % 2 === 0 ? 'right' : 'left' },
                    pr: { md: index % 2 === 0 ? 4 : 0 },
                    pl: { md: index % 2 === 0 ? 0 : 4 },
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'primary.main',
                      opacity: 0.3,
                    }}
                  >
                    {milestone.year}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                    borderRadius: '50%',
                    backgroundColor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(255, 193, 7, 0.4)',
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: { xs: 24, md: 32 }, color: '#FFFFFF' }} />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    pl: { xs: 3, md: index % 2 === 0 ? 0 : 4 },
                    pr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: { xs: 'inline', md: 'none' },
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'primary.main',
                      mr: 2,
                    }}
                  >
                    {milestone.year}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.5,
                    }}
                  >
                    {milestone.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1rem',
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {milestone.description}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 4,
            backgroundColor: 'background.default',
            borderRadius: 3,
            borderLeft: '4px solid',
            borderColor: 'secondary.main',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary' }}>
            Our examinations align with national curriculum standards, and our certificates are recognized by
            leading schools and colleges across India. We continue to innovate and improve our platform to
            serve the best interests of students and their families.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
