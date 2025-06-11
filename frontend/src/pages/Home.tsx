import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImpactStats from '../components/ImpactStats';
import FeatureCard from '../components/FeatureCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Home = () => {
  const features = [
    {
      title: 'Stress Relief',
      description: 'Release tension and stress through controlled destruction in a safe environment.',
      image: '/images/features/stress-relief.jpg',
    },
    {
      title: 'Team Building',
      description: 'Build stronger teams through shared experiences and collaborative activities.',
      image: '/images/features/team-building.jpg',
    },
    {
      title: 'Corporate Events',
      description: 'Unique corporate events that boost morale and foster team spirit.',
      image: '/images/features/corporate.jpg',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Manager',
      company: 'TechCorp',
      image: '/images/testimonials/testimonial1.jpg',
      quote: 'The team building session at SmashLabs was incredible. Our team came back energized and more connected than ever.',
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartUpX',
      image: '/images/testimonials/testimonial2.jpg',
      quote: 'A unique experience that combines fun with stress relief. Highly recommended for any team looking to bond.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/hero/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: 'primary.main',
                textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                mb: 3,
              }}
            >
              SMASH YOUR STRESS
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'text.primary',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Experience the ultimate stress relief through controlled destruction
            </Typography>
            <Button
              component={RouterLink}
              to="/book"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'background.default',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Book Now
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'primary.main',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            }}
          >
            Why Choose SmashLabs?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'primary.main',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            }}
          >
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.paper',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <CardContent>
                      <Box
                        component="img"
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          mb: 2,
                          border: '2px solid',
                          borderColor: 'primary.main',
                        }}
                      />
                      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Impact Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <ImpactStats />
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.default',
          background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/images/hero/hero-neon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              color: 'primary.main',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            }}
          >
            Ready to Smash?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.primary' }}>
            Book your session today and experience the ultimate stress relief
          </Typography>
          <Button
            component={RouterLink}
            to="/book"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'primary.main',
              color: 'background.default',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 