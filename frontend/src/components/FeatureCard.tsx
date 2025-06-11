import { Card, CardContent, Typography, Box } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureCard = ({ title, description, image }: FeatureCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)',
        },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            color: 'primary.main',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard; 