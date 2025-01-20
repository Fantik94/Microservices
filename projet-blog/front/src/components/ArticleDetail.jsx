import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Alert,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNotification } from '../context/NotificationContext';
import { useArticleValidation } from '../hooks/useArticleValidation';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { isValid, loading, article } = useArticleValidation(id, isDeleting);
  const [openDialog, setOpenDialog] = useState(false);
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setOpenDialog(false);
      
      const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      showNotification('Article supprimé avec succès', 'success');
      navigate('/');
    } catch (err) {
      setIsDeleting(false);
      showNotification(err.message, 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !isDeleting) return <CircularProgress />;
  if (!article && !isDeleting) return <Alert severity="error">Article non trouvé</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4 
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Retour aux articles
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/article/edit/${id}`)}
          >
            Modifier
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={() => setOpenDialog(true)}
          >
            Supprimer
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Publié le ${formatDate(article.created_at)}`}
            color="secondary"
            variant="outlined"
          />
        </Box>

        {article.image_url && (
          <Box 
            component="img"
            src={article.image_url}
            alt={article.image_alt || 'Image de l\'article'}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: 2,
              mb: 4
            }}
          />
        )}

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {article.content}
        </Typography>
      </Paper>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            color="primary"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ArticleDetail;