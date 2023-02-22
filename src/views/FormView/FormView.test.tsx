import { render, screen } from '@testing-library/react';
import { FormView } from './FormView';

test('renders learn react link', () => {
  render(<FormView />);
  const linkElement = screen.getByText(/Find/i);
  expect(linkElement).toBeInTheDocument();
});
