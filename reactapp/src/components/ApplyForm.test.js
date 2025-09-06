import { render, screen } from '@testing-library/react';
import ApplyForm from './ApplyForm';

test('renders apply form', () => {
  render(<ApplyForm />);
  expect(screen.getByText(/apply to become a tutor/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/qualification/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
});