import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransferPage from './TransferPage';

describe('<Transfer />', () => {
  test('it should mount', () => {
    render(<TransferPage />);
    
    const transfer = screen.getByTestId('Transfer');

    expect(transfer).toBeInTheDocument();
  });
});