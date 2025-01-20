import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (articleId) => {
    setBookmarks(prevBookmarks => {
      if (!prevBookmarks.includes(articleId)) {
        return [...prevBookmarks, articleId];
      }
      return prevBookmarks;
    });
  };

  const removeBookmark = (articleId) => {
    setBookmarks(prevBookmarks => 
      prevBookmarks.filter(id => id !== articleId)
    );
  };

  const toggleBookmark = (articleId) => {
    setBookmarks(prevBookmarks => {
      const newBookmarks = prevBookmarks.includes(articleId)
        ? prevBookmarks.filter(id => id !== articleId)
        : [...prevBookmarks, articleId];
      return newBookmarks;
    });
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked: (articleId) => bookmarks.includes(articleId)
  };
} 