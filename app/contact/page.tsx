'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import NavigationBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { submitContactForm } from '@/lib/api';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <NavigationBar />
      <Box sx={{ pt: { xs: 8, md: 4 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
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
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'text.secondary',
                mb: 8,
              }}
            >
              Have questions? We'd love to hear from you
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 3,
                    }}
                  >
                    Send us a Message
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                      {error}
                    </Alert>
                  )}

                  {submitted ? (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Thank you for contacting us! We'll get back to you within 24 hours.
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            required
                            label="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            required
                            type="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            required
                            label="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            required
                            multiline
                            rows={5}
                            label="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            fullWidth
                            disabled={loading}
                            sx={{ py: 1.5, fontSize: '1.1rem' }}
                          >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Paper>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card sx={{ mb: 3, borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <LocationOnIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Takenstar Education & Technology,<br /> Sivasagar, Assam, India
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <EmailIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          contact@takenstartalentsearch.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Phone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          +91 7002742502
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Follow Us
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          sx={{
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: 'secondary.main',
                              color: 'text.primary',
                            },
                          }}
                        >
                          <FacebookIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: 'secondary.main',
                              color: 'text.primary',
                            },
                          }}
                        >
                          <InstagramIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: 'secondary.main',
                              color: 'text.primary',
                            },
                          }}
                        >
                          <LinkedInIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    width: '100%',
                    height: 250,
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: 'divider',
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.9164516373667!2d94.6254875754936!3d26.947687476626363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf2791716a8769b9%3A0x20d95b1074a03bbc!2sTakenstar%20Education%20and%20Technology!5e1!3m2!1sen!2sin!4v1760461163423!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>

              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
