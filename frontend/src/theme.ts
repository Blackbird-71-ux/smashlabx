import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Neon green
      light: '#33ff33',
      dark: '#00cc00',
    },
    secondary: {
      main: '#ff00ff', // Neon pink
      light: '#ff33ff',
      dark: '#cc00cc',
    },
    background: {
      default: '#000000', // Pure black
      paper: '#111111', // Slightly lighter black for cards
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export default theme; 