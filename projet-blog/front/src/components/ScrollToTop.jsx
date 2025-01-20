import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible && (
    <Fab 
      color="secondary"
      sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20,
        opacity: 0.8,
        '&:hover': { opacity: 1 }
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
}

export default ScrollToTop;
