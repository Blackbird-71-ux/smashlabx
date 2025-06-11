import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImpactStats from '../components/ImpactStats';
import FeatureCard from '../components/FeatureCard';
import { motion } from 'framer-motion';

// Import images
import smashlabsRoom from '../assets/images/smashlabs-room.jpg';
import stressRelief from '../assets/images/stress-relief.jpg';
import teamBuilding from '../assets/images/team-building.jpg';
import corporate from '../assets/images/corporate.jpg';
import testimonial1 from '../assets/images/testimonial1.jpg';
import testimonial2 from '../assets/images/testimonial2.jpg';

const MotionBox = motion(Box);

const Home = () => {
  const impactStats = [
    { value: 1000, label: 'Professionals Transformed' },
    { value: 85, label: 'Stress Reduction %', suffix: '%' },
    { value: 50, label: 'Corporate Partners' },
  ];

  const features = [
    {
      title: 'Effective Stress Release',
      description: 'Release workplace tension through controlled, cathartic activities',
      icon: '🎯',
      image: stressRelief
    },
    {
      title: 'Unique Team Building',
      description: 'Strengthen team bonds through shared experiences',
      icon: '🤝',
      image: teamBuilding
    },
    {
      title: 'Safe & Professional',
      description: 'Comprehensive approach to mental and physical wellbeing',
      icon: '⚡',
      image: smashlabsRoom
    },
    {
      title: 'Tailored for Corporate Wellness',
      description: 'Professional environment with safety and comfort',
      icon: '🧘',
      image: corporate
    },
  ];

  const testimonials = [
    {
      quote: "SmashLabs transformed our team's approach to stress management. The experience was both cathartic and team-building.",
      author: "Sarah Johnson",
      role: "HR Director, Tech Corp",
      image: testimonial1
    },
    {
      quote: "The most effective corporate wellness program we've implemented. Our employees love it!",
      author: "Michael Chen",
      role: "CEO, Innovation Labs",
      image: testimonial2
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero" sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <MotionBox 
            className="hero-content" 
            sx={{ 
              textAlign: 'center',
              py: { xs: 8, md: 12 }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="/images/logo.png"
                alt="SmashLabs Logo" 
                style={{ 
                  height: 120, 
                  marginBottom: 32,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }} 
              />
            </MotionBox>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 4,
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Transform Your Corporate Wellness
              </Typography>
            </Box>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              sx={{ mb: 6 }}
            >
              <Box className="card hover-glow" sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}>
                <video
                  controls
                  preload="metadata"
                  crossOrigin="anonymous"
                  poster="/images/video-poster.jpg"
                  style={{ width: '100%', height: 'auto' }}
                >
                  <source src="/videos/smashlabs-new.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </MotionBox>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 6, 
                  maxWidth: 800, 
                  mx: 'auto',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                Step into a unique, aesthetic space where corporate visitors can smash, release, and rejuvenate. Transform your workplace stress into cathartic release.
              </Typography>
            </Box>
            <MotionBox 
              sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                component={RouterLink}
                to="/packages"
                className="btn btn-primary hover-lift"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF5252, #3DBEB6)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Explore Packages
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                className="btn btn-outline hover-lift"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  border: '2px solid white',
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Book a Demo
              </Button>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>

      {/* Impact Stats Section */}
      <MotionBox 
        className="section" 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: 'background.paper',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{
                mb: 8,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our Impact
            </Typography>
          </Box>
          <ImpactStats stats={impactStats} />
        </Container>
      </MotionBox>

      {/* Features Section */}
      <MotionBox 
        className="section" 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{
                mb: 8,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'white'
              }}
            >
              Why SmashLabs?
            </Typography>
          </Box>
          <Grid container spacing={4} className="features">
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <FeatureCard {...feature} className="feature-card hover-lift" />
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>

      {/* Experience Section */}
      <MotionBox 
        className="section" 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: 'background.paper',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Box className="card hover-glow" sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src="/images/smashlabs-room.png" 
                    alt="SmashLabs Experience Room" 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  component="h2" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Experience the Difference
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.primary'
                  }}
                >
                  Our state-of-the-art facility is designed to provide a safe, controlled environment for stress release and team building. With professional equipment and trained staff, we ensure a memorable and effective experience for all participants.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/contact"
                  className="btn btn-primary hover-lift"
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF5252, #3DBEB6)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Schedule a Visit
                </Button>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </MotionBox>

      {/* Testimonials Section */}
      <MotionBox 
        className="section" 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{
                mb: 8,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'white'
              }}
            >
              What Our Clients Say
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="hover-lift" sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            marginRight: 16,
                            border: '3px solid rgba(255,255,255,0.2)'
                          }}
                        />
                        <Box>
                          <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'white' }}>
                            {testimonial.author}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ 
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                      }}>
                        "{testimonial.quote}"
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>

      {/* CTA Section */}
      <MotionBox 
        className="section" 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          color: 'white'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <MotionBox 
            sx={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 4,
                color: 'white'
              }}
            >
              Ready to Transform Your Workplace?
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 6, 
                maxWidth: 800, 
                mx: 'auto',
                lineHeight: 1.6,
                opacity: 0.9
              }}
            >
              Join the growing number of companies that are revolutionizing their approach to corporate wellness with SmashLabs.
            </Typography>
            <Button
              component={RouterLink}
              to="/contact"
              className="btn btn-primary hover-lift"
              size="large"
              sx={{ 
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }
              }}
            >
              Get Started Today
            </Button>
          </MotionBox>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default Home; 