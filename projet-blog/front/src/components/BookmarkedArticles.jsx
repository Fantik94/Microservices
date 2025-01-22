import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Alert } from '@mui/material';
import { useBookmarks } from '../hooks/useBookmarks';
import ArticleCard from './ArticleCard';

function BookmarkedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const allArticles = await response.json();
        const bookmarkedArticles = allArticles.filter(article => 
          bookmarks.includes(article.id)
        );
        setArticles(bookmarkedArticles);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedArticles();
  }, [bookmarks]);

  if (loading) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Articles favoris
      </Typography>
      
      {articles.length === 0 ? (
        <Alert severity="info">
          Vous n'avez pas encore d'articles en favoris
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {articles.map(article => (
            <Grid item xs={12} md={6} lg={4} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default BookmarkedArticles; 