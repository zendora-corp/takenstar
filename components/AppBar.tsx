'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NAV_ITEMS } from '@/app/_data/home';
import Image from 'next/image';
import Link from 'next/link';
import SchoolIcon from '@mui/icons-material/School';

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    router.push(href);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(11, 29, 72, 0.9)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1, justifyContent:"space-between" }}>
          <Link href={'/'}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
              <SchoolIcon sx={{ fontSize: 58, color: 'secondary.main' }} />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'Poppins, sans-serif',
                  color: scrolled ? 'primary.main' : '#FFFFFF'
                }}
              >
                Takenstar Scholar
              </Typography>
            </Box>
          </Link>

          {isMobile ? (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: scrolled ? 'primary.main' : '#FFFFFF' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: scrolled ? 'text.primary' : '#FFFFFF',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 2,
                      backgroundColor: 'secondary.main',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '80%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Link href="/registration" passHref>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleNavClick('/registration')}
                  sx={{ ml: 1 }}
                >
                  Register Now
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavClick(item.href)}>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                      fontSize: '1rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2, px: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleNavClick('/registration')}
            >
              Register Now
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
