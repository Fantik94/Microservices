import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

export function useArticleValidation(id, isDeleting = false) {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const validateArticle = async () => {
      if (!id || isDeleting) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/articles/${id}`);
        
        if (!response.ok) {
          throw new Error('Article non trouvé');
        }

        const data = await response.json();
        setArticle(data);
        setIsValid(true);
      } catch (error) {
        showNotification('Article invalide ou supprimé', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    validateArticle();
  }, [id, navigate, showNotification, isDeleting]);

  return { isValid, loading, article };
}