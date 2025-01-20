import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configuration de l'environnement de test
beforeAll(() => {
  // Mock de fetch global
  global.fetch = vi.fn();
  
  // Mock de sessionStorage
  const mockSessionStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
  };
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage
  });
});

// Nettoyage après chaque test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 