import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/images/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Why SmashLabs', path: '/why-smashlabs' },
    { label: 'Packages', path: '/packages' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                  },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: 4,
              }}
            >
              <img
                src={logo}
                alt="SmashLabs Logo"
                style={{ height: 40, marginRight: 12 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                SmashLabs
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 6,
          background: 'linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,1) 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <img
                src={logo}
                alt="SmashLabs Logo"
                style={{ height: 40, marginRight: 12 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                SmashLabs
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} SmashLabs. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Button
                component={RouterLink}
                to="/privacy"
                color="inherit"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                Privacy Policy
              </Button>
              <Button
                component={RouterLink}
                to="/terms"
                color="inherit"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                Terms of Service
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 