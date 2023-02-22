import { render, screen } from '@testing-library/react';
import { LocationView } from './LocationView';

test('renders learn react link', () => {
  render(<LocationView />);
  const linkElement = screen.getByText(/Location/i);
  expect(linkElement).toBeInTheDocument();
});
