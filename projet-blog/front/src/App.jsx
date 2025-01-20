import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import ArticleForm from './components/ArticleForm';
import NotFound from './components/NotFound';
import BookmarkedArticles from './components/BookmarkedArticles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Router>
          <Box sx={{ 
            minHeight: '100vh',
            bgcolor: 'background.default',
            pb: 8 
          }}>
            <Navbar />
            <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
              <Routes>
                <Route path="/" element={<ArticlesList />} />
                <Route path="/bookmarks" element={<BookmarkedArticles />} />
                <Route path="/article/new" element={<ArticleForm />} />
                <Route path="/article/edit/:id" element={<ArticleForm />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/article" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
