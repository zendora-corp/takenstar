'use client';

import { Box, Container, Typography, Grid, Link, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import { FOOTER_LINKS } from '@/app/_data/home';

const socialIconMap: { [key: string]: any } = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

export default function Footer() {
  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: '#0B1D48',
        color: '#FFFFFF',
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <SchoolIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Takenstar Scholar
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
                fontSize: '0.95rem',
              }}
            >
              A regional talent search exam for Classes 6 to 12, organized across schools in Assam,
              with two competition groups and exciting cash prizes.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {FOOTER_LINKS.quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem',
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                📍 Head Office: Takenstar Education & Technology, Sivasagar, Assam, India
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                }}
              >
                📞 Phone: +91 7002742502
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.95rem',
                }}
              >
                📧 Email: contact@takenstartalentsearch.com
              </Typography>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem',
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {FOOTER_LINKS.social.map((social) => {
                const IconComponent = socialIconMap[social.icon];
                return (
                  <IconButton
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: 'text.primary',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <IconComponent />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem',
            }}
          >
            © 2025 Takenstar Talent Search. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#privacy"
              underline="none"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              underline="none"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              Terms & Conditions
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
