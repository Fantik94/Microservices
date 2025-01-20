import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: '5rem', 
            color: 'secondary.main',
            mb: 2
          }} 
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Page non trouvée
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 2 }}
        >
          Retourner à l'accueil
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound; 