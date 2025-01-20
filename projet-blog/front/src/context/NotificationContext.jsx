import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const NotificationContext = createContext();

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
      >
        {notification && (
          <Alert 
            onClose={handleClose} 
            severity={notification.type}
            variant="filled"
            icon={notification.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
            sx={{ 
              width: '100%',
              minWidth: '300px',
              borderRadius: '8px',
              boxShadow: (theme) => theme.shadows[3],
              '& .MuiAlert-icon': {
                fontSize: '24px'
              },
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500
              },
              bgcolor: notification.type === 'success' ? 'success.dark' : 'error.dark',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 