import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const defaultStats = [
  { value: 1000, label: 'Professionals Transformed' },
  { value: 85, label: 'Stress Reduction', suffix: '%' },
  { value: 50, label: 'Corporate Partners' },
];

const ImpactStats = () => {
  return (
    <Box>
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
        Our Impact
      </Typography>
      <Grid container spacing={4}>
        {defaultStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                  },
                }}
              >
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    color: 'primary.main',
                    textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                    mb: 1,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImpactStats; 