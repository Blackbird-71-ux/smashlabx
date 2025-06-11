import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { sendContactForm, ContactFormData } from '../services/api';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  company: yup.string().required('Company name is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      try {
        await sendContactForm(values);
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.',
        });
        formik.resetForm();
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        color: 'white',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/images/cta-bg.jpg) center/cover no-repeat fixed',
          opacity: 0.1,
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{
            mb: 6,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }
              }}
            >
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.7)',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.7)',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="company"
                    name="company"
                    label="Company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                    margin="normal"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.7)',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    margin="normal"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.7)',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                    }}
                  />
                  {submitStatus.type && (
                    <Alert 
                      severity={submitStatus.type} 
                      sx={{ 
                        mb: 2,
                        bgcolor: submitStatus.type === 'success' ? 'rgba(46,125,50,0.1)' : 'rgba(211,47,47,0.1)',
                        color: 'white',
                        '& .MuiAlert-icon': {
                          color: submitStatus.type === 'success' ? '#4caf50' : '#f44336',
                        }
                      }}
                    >
                      {submitStatus.message}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                height: '100%',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }
              }}
            >
              <CardContent>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  123 Corporate Plaza
                  <br />
                  New York, NY 10001
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Email: info@smashlabs.com
                  <br />
                  Phone: +1 (212) 555-1234
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Business Hours:
                  <br />
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 