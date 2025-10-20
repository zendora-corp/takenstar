'use client';

import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Who can participate?',
    answer: 'Students of Classes 6 to 12, divided into two groups.',
  },
  {
    question: 'What subjects are included?',
    answer: 'General Knowledge, Science, Mathematics, Logical Reasoning, and Current Affairs.',
  },
  {
    question: 'How many rounds are there?',
    answer: 'Only One Exam Round.',
  },
  {
    question: 'What is the registration fee?',
    answer: '100 rupees only!',
  },
  {
    question: 'How are results announced?',
    answer: 'Results will be published on the official website and shared with schools.',
  }
];

export default function FAQsPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <NavigationBar />
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'text.secondary',
                mb: 6,
              }}
            >
              Find answers to common questions about Takenstar Talent Search
            </Typography>
          </motion.div>

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      my: 2,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1rem',
                      color: 'text.secondary',
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
