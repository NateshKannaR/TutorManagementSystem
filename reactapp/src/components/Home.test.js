import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByText(/welcome to the tutor application/i)).toBeInTheDocument();
  expect(screen.getByText(/become a tutor/i)).toBeInTheDocument();
});