import { render, screen } from '@testing-library/react';
import App from './App';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

test('renders login form when not authenticated', () => {
  render(<App />);
  const loginButtons = screen.getAllByRole('button', { name: /login/i });
  expect(loginButtons.length).toBeGreaterThan(0);
});

test('renders register form when toggled', () => {
  render(<App />);
  const registerButton = screen.getByRole('button', { name: /register/i });
  expect(registerButton).toBeInTheDocument();
});