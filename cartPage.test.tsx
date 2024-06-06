import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '@/pages/cart';

test('renders Cart component', () => {
  render(<CartPage />);
  expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
});
