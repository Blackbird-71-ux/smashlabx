import { Box, Container, Typography, Grid } from '@mui/material';

const WhySmashLabs = () => {
  const features = [
    {
      title: 'Corporate Wellness Redefined',
      description: 'Transform workplace stress into cathartic release through our innovative approach to corporate wellness.',
      icon: '🎯',
    },
    {
      title: 'Safe & Professional',
      description: 'Experience stress relief in a controlled, professional environment designed specifically for corporate teams.',
      icon: '⚡',
    },
    {
      title: 'Team Building',
      description: 'Strengthen team bonds through shared experiences and collaborative activities.',
      icon: '🤝',
    },
    {
      title: 'Stress Management',
      description: 'Learn effective stress management techniques while having fun in a unique setting.',
      icon: '🧘',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 4,
            }}
          >
            Why Choose SmashLabs?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6,
              color: 'text.secondary',
            }}
          >
            We're revolutionizing corporate wellness by combining stress relief, team building, and professional development in a unique, engaging environment.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '3rem',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h4"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 6,
            }}
          >
            The Benefits
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                  Immediate Stress Relief
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Experience instant stress reduction through our controlled, cathartic activities.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                  Enhanced Team Bonding
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Build stronger team relationships through shared experiences and collaborative activities.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                  Long-term Wellness
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Learn sustainable stress management techniques for ongoing workplace wellness.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhySmashLabs; 