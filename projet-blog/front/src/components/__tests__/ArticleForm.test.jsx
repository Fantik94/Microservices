import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ArticleForm from '../ArticleForm';
import { NotificationProvider } from '../../context/NotificationContext';

// Mock de useArticleValidation
vi.mock('../../hooks/useArticleValidation', () => ({
  useArticleValidation: () => ({
    isValid: true,
    loading: false
  })
}));

// Mock de react-router-dom
let mockId;
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: mockId })
  };
});

describe('ArticleForm CRUD Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockId = undefined;
    global.fetch.mockReset();
  });

  it('performs full CRUD operations', async () => {
    // Mock pour CREATE
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Article créé' })
      })
    );

    const { unmount } = render(
      <MemoryRouter>
        <NotificationProvider>
          <ArticleForm />
        </NotificationProvider>
      </MemoryRouter>
    );

    // CREATE
    const titleInput = screen.getByTestId('title-input');
    const contentInput = screen.getByTestId('content-input');
    
    await waitFor(() => {
      fireEvent.change(titleInput, { target: { value: 'Nouveau Article' } });
      fireEvent.change(contentInput, { target: { value: 'Contenu test' } });
    });

    const submitButton = screen.getByRole('button', { name: /publier/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/articles',
        expect.objectContaining({ method: 'POST' })
      );
    });

    unmount();

    // Mock pour UPDATE
    global.fetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            id: 1,
            title: 'Nouveau Article',
            content: 'Contenu test'
          })
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Article mis à jour' })
        })
      );

    mockId = '1';

    render(
      <MemoryRouter>
        <NotificationProvider>
          <ArticleForm />
        </NotificationProvider>
      </MemoryRouter>
    );

    // UPDATE - Utiliser data-testid
    const updateTitleInput = await screen.findByTestId('title-input');
    fireEvent.change(updateTitleInput, {
      target: { value: 'Article Modifié' }
    });

    const updateButton = screen.getByRole('button', { name: /mettre à jour/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/articles/1',
        expect.objectContaining({ method: 'PUT' })
      );
    });
  }, 10000);
}); 