import { Card, CardContent, CardMedia, Typography, Box, Chip, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkButton from './BookmarkIcon';

function ArticleCard({ article, onToggleBookmark, isBookmarked }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-12px)',
        boxShadow: (theme) => theme.shadows[8],
        '& img': {
          transform: 'scale(1.05)'
        }
      }
    }}>
      <CardActionArea 
        component={Link} 
        to={`/article/${article.id}`}
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        {article.image_url && (
          <CardMedia
            component="img"
            height="200"
            image={article.image_url}
            alt={article.image_alt || 'Image de l\'article'}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h6" 
            component="h2"
            gutterBottom 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1
            }}
          >
            {article.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              flexGrow: 1
            }}
          >
            {article.content}
          </Typography>
          <Box sx={{ 
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Chip
              icon={<AccessTimeIcon />}
              label={formatDate(article.created_at)}
              size="small"
              color="secondary"
              variant="outlined"
            />
            <BookmarkButton 
              articleId={article.id}
              isBookmarked={isBookmarked}
              onToggle={onToggleBookmark}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard; 