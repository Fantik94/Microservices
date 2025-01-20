import { Snackbar, Alert, CircularProgress, Box } from '@mui/material';

function ActionFeedback({ loading, success, error, onClose }) {
  return (
    <>
      {loading && (
        <Box 
          sx={{ 
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            p: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CircularProgress color="primary" />
          <span>Chargement en cours...</span>
        </Box>
      )}
      <Snackbar 
        open={success || error} 
        autoHideDuration={4000} 
        onClose={onClose}
      >
        <Alert 
          severity={success ? "success" : "error"} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ActionFeedback; 