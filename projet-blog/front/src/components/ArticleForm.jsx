import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  Button, 
  Box,
  Typography,
  Card,
  CardMedia,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useNotification } from '../context/NotificationContext';
import { useArticleValidation } from '../hooks/useArticleValidation';

function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isValid, loading: validationLoading } = useArticleValidation(id);
  const [article, setArticle] = useState({
    title: '',
    content: '',
    image_url: '',
    image_alt: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/articles/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Article non trouvé');
          return res.json();
        })
        .then(data => {
          // S'assurer que tous les champs sont présents
          setArticle({
            title: data.title || '',
            content: data.content || '',
            image_url: data.image_url || '',
            image_alt: data.image_alt || '' // Assurez-vous que ce champ est inclus
          });
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = id 
        ? `http://localhost:3000/api/articles/${id}`
        : 'http://localhost:3000/api/articles';
      
      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error('Erreur serveur');
      }

      const data = await response.json();
      showNotification('Article sauvegardé avec succès', 'success');
      navigate('/');

    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'TypeError') {
        showNotification('Mode hors-ligne : les modifications ne seront pas sauvegardées', 'warning');
        navigate('/');
      } else {
        showNotification(err.message, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImagePreviewError(true);
  };

  const clearImage = () => {
    setArticle({
      ...article,
      image_url: '',
      image_alt: '' // Vider aussi le texte alternatif quand on supprime l'image
    });
    setImagePreviewError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            {id ? 'Modifier l\'article' : 'Nouvel article'}
          </Typography>

          <TextField
            fullWidth
            label="Titre"
            value={article.title}
            onChange={(e) => setArticle({...article, title: e.target.value})}
            margin="normal"
            required
            variant="outlined"
            inputProps={{ 'data-testid': 'title-input' }}
          />

          <Box sx={{ mt: 3, mb: 3 }}>
            <TextField
              fullWidth
              label="URL de l'image"
              value={article.image_url}
              onChange={(e) => setArticle({...article, image_url: e.target.value})}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: article.image_url && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearImage} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Description de l'image"
              value={article.image_alt}
              onChange={(e) => setArticle({...article, image_alt: e.target.value})}
              margin="normal"
              variant="outlined"
              helperText="Décrivez l'image pour l'accessibilité"
            />

            {article.image_url && !imagePreviewError && (
              <Card sx={{ mt: 2, boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={article.image_url}
                  alt={article.image_alt}
                  onError={handleImageError}
                  sx={{
                    borderRadius: 2,
                    objectFit: 'cover',
                  }}
                />
              </Card>
            )}
          </Box>

          <TextField
            fullWidth
            label="Contenu de l'article"
            multiline
            rows={12}
            value={article.content}
            onChange={(e) => setArticle({...article, content: e.target.value})}
            margin="normal"
            required
            variant="outlined"
            sx={{ mb: 4 }}
            inputProps={{ 'data-testid': 'content-input' }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              {loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Publier')}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Notification de succès */}
      <Snackbar
        open={!!success}
        autoHideDuration={1500}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccess} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {success}
        </Alert>
      </Snackbar>

      {/* Notification d'erreur */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ArticleForm; 