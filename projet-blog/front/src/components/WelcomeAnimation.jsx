import { Box, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

function WelcomeAnimation() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #00B894 0%, #6C63FF 100%)',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Fade in timeout={1000}>
        <Box sx={{ animation: `${slideIn} 1s ease-out` }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            Bienvenue sur le Blog
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Découvrez des articles passionnants et partagez vos idées
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default WelcomeAnimation; 