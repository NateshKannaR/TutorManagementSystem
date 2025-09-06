import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => 'testuser'),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

test('renders navbar', () => {
  render(
    <BrowserRouter>
      <NavBar onLogout={() => {}} userRole="TUTOR" />
    </BrowserRouter>
  );
  expect(screen.getByText(/tutor application/i)).toBeInTheDocument();
});