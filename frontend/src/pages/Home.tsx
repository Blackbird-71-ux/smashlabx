import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h1" gutterBottom>
          Welcome to SmashLabs
        </Typography>
        <Typography variant="body1" paragraph>
          Your premier destination for corporate wellness and fitness solutions.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Typography variant="h2" gutterBottom>
              Transform Your Workplace
            </Typography>
            <Typography variant="body1" paragraph>
              We help companies create healthier, more productive work environments
              through innovative wellness programs and fitness solutions.
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              color="primary"
              size="large"
            >
              Get Started
            </Button>
          </Box>
          <Box>
            <Typography variant="h2" gutterBottom>
              Our Services
            </Typography>
            <Typography variant="body1" paragraph>
              From on-site fitness facilities to comprehensive wellness programs,
              we provide everything you need to promote employee health and well-being.
            </Typography>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              color="primary"
              size="large"
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 