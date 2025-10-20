'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const examLevels = [
  { label: 'Junior', classes: 'Classes 3–5' },
  { label: 'Middle', classes: 'Classes 6–8' },
  { label: 'Senior', classes: 'Classes 9–10' },
  { label: 'Higher', classes: 'Classes 11–12' },
];

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'General Knowledge',
  'Logical Reasoning',
  'Current Affairs',
];

const examDetails = [
  { parameter: 'Format', details: 'Multiple Choice Questions (MCQs)' },
  { parameter: 'Duration', details: '90 minutes' },
  { parameter: 'Total Questions', details: '50–100 (varies by level)' },
  { parameter: 'Marking', details: '+1 for correct, no negative marking' },
  { parameter: 'Mode', details: 'Online (Computer-based)' },
  { parameter: 'Language', details: 'English & Hindi' },
];

export default function ExamFormatSection() {
  const [tabValue, setTabValue] = useState(0);
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
            Examination Format
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
            Comprehensive details about our examination structure
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            elevation={3}
            sx={{
              mb: 4,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              sx={{
                backgroundColor: 'primary.main',
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2,
                },
                '& .Mui-selected': {
                  color: '#FFC107 !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FFC107',
                  height: 3,
                },
              }}
            >
              {examLevels.map((level, index) => (
                <Tab key={index} label={level.label} />
              ))}
            </Tabs>

            <Box sx={{ p: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 3,
                }}
              >
                {examLevels[tabValue].label} Level
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                <strong>Applicable for:</strong> {examLevels[tabValue].classes}
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Subjects Covered
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 }}>
            {subjects.map((subject, index) => (
              <Chip
                key={index}
                label={subject}
                sx={{
                  fontSize: '1rem',
                  py: 2.5,
                  px: 1,
                  fontWeight: 500,
                  backgroundColor: 'primary.light',
                  color: '#FFFFFF',
                }}
              />
            ))}
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Exam Details
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
              <TableBody>
                {examDetails.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: 'background.default',
                      },
                      '&:last-child td': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        color: 'text.primary',
                        width: '30%',
                      }}
                    >
                      {row.parameter}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '1.05rem',
                        color: 'text.secondary',
                      }}
                    >
                      {row.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </Container>
    </Box>
  );
}
