import { Box, Container, Typography, Button, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PackageFeature {
  text: string;
}

interface Package {
  title: string;
  subtitle: string;
  features: PackageFeature[];
}

const Packages = () => {
  const packages: Package[] = [
    {
      title: 'Team Express',
      subtitle: 'Perfect for small teams',
      features: [
        { text: '2-hour stress relief session' },
        { text: 'Up to 10 team members' },
        { text: 'Basic safety equipment' },
        { text: 'Refreshments included' },
        { text: 'Basic wellness consultation' },
      ],
    },
    {
      title: 'Corporate Catalyst',
      subtitle: 'Comprehensive team solution',
      features: [
        { text: '4-hour premium experience' },
        { text: 'Up to 25 team members' },
        { text: 'Premium safety equipment' },
        { text: 'Gourmet refreshments' },
        { text: 'Wellness workshop included' },
      ],
    },
    {
      title: 'Executive Edge',
      subtitle: 'Full-scale corporate program',
      features: [
        { text: 'Full-day premium experience' },
        { text: 'Up to 50 team members' },
        { text: 'Premium safety equipment' },
        { text: 'Gourmet refreshments' },
        { text: 'Wellness workshop included' },
        { text: 'Team building activities' },
        { text: 'Executive coaching session' },
        { text: 'Customized wellness program' },
      ],
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #333333 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Our Corporate Packages
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {packages.map((pkg, index) => (
            <Grid key={index} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {pkg.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {pkg.subtitle}
                  </Typography>
                  <List>
                    {pkg.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={feature.text} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                  >
                    Request Quote
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Packages; 