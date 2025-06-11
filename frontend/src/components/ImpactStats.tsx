import { Box, Grid, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

interface ImpactStatsProps {
  stats: Stat[];
}

const ImpactStats = ({ stats }: ImpactStatsProps) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  scrollSpyDelay={200}
                  suffix={stat.suffix || ''}
                />
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 500
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImpactStats; 