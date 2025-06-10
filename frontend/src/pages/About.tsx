import React from 'react';
import {
  Box,
  Typography,
  Container,
} from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h1" gutterBottom>
          About SmashLabs
        </Typography>
        <Typography variant="body1" paragraph>
          SmashLabs is a premier corporate wellness center dedicated to helping companies
          and their employees achieve optimal health and productivity through innovative
          fitness programs and wellness solutions.
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to transforming workplace wellness by providing innovative,
          engaging, and effective wellness programs that empower employees to lead
          healthier lives.
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
          Our Values
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Innovation
            </Typography>
            <Typography variant="body1" paragraph>
              We constantly seek new and better ways to improve workplace wellness,
              staying at the forefront of industry trends and research.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom>
              Excellence
            </Typography>
            <Typography variant="body1" paragraph>
              We are committed to delivering the highest quality wellness programs
              and services to our corporate clients.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom>
              Impact
            </Typography>
            <Typography variant="body1" paragraph>
              We measure our success by the positive impact we have on employees'
              health and well-being.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom>
              Collaboration
            </Typography>
            <Typography variant="body1" paragraph>
              We work closely with our clients to understand their unique needs
              and create customized wellness solutions.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 