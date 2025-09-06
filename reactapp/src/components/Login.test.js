import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  render(<Login onLogin={() => {}} />);
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});