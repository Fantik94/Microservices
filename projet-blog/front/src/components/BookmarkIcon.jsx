import { IconButton, Tooltip } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function BookmarkButton({ articleId, isBookmarked, onToggle }) {
  return (
    <Tooltip title={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}>
      <IconButton 
        onClick={(e) => {
          e.preventDefault();
          onToggle(articleId);
        }}
        sx={{ 
          color: isBookmarked ? 'secondary.main' : 'action.disabled',
          '&:hover': {
            color: isBookmarked ? 'secondary.dark' : 'action.active'
          }
        }}
      >
        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default BookmarkButton; 