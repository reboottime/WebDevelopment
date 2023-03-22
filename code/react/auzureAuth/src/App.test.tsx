import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

it('render', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
});
