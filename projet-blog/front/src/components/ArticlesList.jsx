import { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Typography, 
  Box,
  Chip,
  CardActionArea,
  Pagination,
  Fade,
  CircularProgress,
  Alert,
  Paper,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WelcomeAnimation from './WelcomeAnimation';
import AddIcon from '@mui/icons-material/Add';
import { useNotification } from '../context/NotificationContext'; 
import ArticleCard from './ArticleCard';
import { useBookmarks } from '../hooks/useBookmarks';
import mockArticles from '../mocks/articlesMock';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showWelcome, setShowWelcome] = useState(() => {
    // Vérifie si c'est la première visite
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true');
      return true;
    }
    return false;
  });

  const articlesPerPage = 9;

  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  const { showNotification } = useNotification();

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/articles', {
        signal: AbortSignal.timeout(5000) // Timeout de 5 secondes
      });
      
      if (!response.ok) throw new Error('Erreur serveur');
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      console.warn('Erreur API, utilisation des données mockées:', err);
      return { success: false, data: mockArticles };
    }
  };

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const { success, data } = await fetchArticles();
      setArticles(data);
      if (!success) {
        showNotification('Mode hors-ligne : données de démonstration', 'warning');
      }
      setLoading(false);
    };

    loadArticles();
  }, [showNotification]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedArticles = articles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
      ) : (
        <Fade in={!showWelcome}>
          <Container 
            maxWidth="lg" 
            sx={{
              mt: { xs: 4, md: 6 },
              mb: { xs: 6, md: 8 }
            }}
          >
            <Box 
              sx={{ 
                textAlign: 'center',
                mb: { xs: 5, md: 7 },
                animation: 'fadeInUp 1s ease-out'
              }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00B894, #00CEC9)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Articles Récents
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ my: 4 }}>
                {error}
              </Alert>
            ) : articles.length === 0 ? (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                  borderRadius: 2
                }}
              >
                <Typography variant="h5" gutterBottom color="text.secondary">
                  Aucun article disponible
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Soyez le premier à publier un article !
                </Typography>
                <Button 
                  component={Link} 
                  to="/article/new" 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                >
                  Créer un article
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={4}>
                {paginatedArticles.map(article => (
                  <Grid 
                    item 
                    xs={12} 
                    md={6} 
                    lg={4} 
                    key={article.id}
                  >
                    <ArticleCard 
                      article={article}
                      isBookmarked={isBookmarked(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {articles.length > articlesPerPage && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 6
              }}>
                <Pagination
                  count={Math.ceil(articles.length / articlesPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="secondary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1.1rem'
                    }
                  }}
                />
              </Box>
            )}
          </Container>
        </Fade>
      )}
    </>
  );
}

export default ArticlesList;
