import { Box, Card, CardContent, Typography } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <Card
      className={`card hover-lift ${className || ''}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #2D2D2D 0%, #1A1A1A 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="h3"
            className="rotate-in"
            sx={{
              fontSize: '3rem',
              mb: 2,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
          >
            {icon}
          </Typography>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            className="fade-in"
            sx={{
              fontWeight: 600,
              color: '#FF4D4D',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="fade-in"
            sx={{
              lineHeight: 1.6,
              maxWidth: '90%',
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureCard; 