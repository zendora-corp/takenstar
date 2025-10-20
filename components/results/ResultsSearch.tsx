'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ResultsSearch() {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    setResult({
      name: 'Amit Kumar',
      rollNumber: 'TTS2025001234',
      class: '10',
      score: 92,
      rank: 15,
      status: 'Qualified',
    });
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #2F55D4 0%, #5C79EA 100%)',
        color: '#FFFFFF',
      }}
    >
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
            }}
          >
            Check Your Results
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 5,
              opacity: 0.95,
            }}
          >
            Enter your roll number to view your examination results
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Enter Your Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.default',
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{ px: 4, whiteSpace: 'nowrap' }}
              >
                Search
              </Button>
            </Box>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: 'success.light',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'success.main',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EmojiEventsIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                    <Chip
                      label={result.status}
                      color="success"
                      sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {result.name}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Roll Number
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {result.rollNumber}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Class
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {result.class}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Score
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="primary.main">
                        {result.score}%
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        National Rank
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="secondary.main">
                        #{result.rank}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      sx={{ flex: 1 }}
                    >
                      Download Result
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      sx={{ flex: 1 }}
                    >
                      Download Certificate
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
