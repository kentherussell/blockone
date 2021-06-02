import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Transfer from './Transfer';

describe('<Transfer />', () => {
  test('it should mount', () => {
    render(<Transfer />);
    
    const transfer = screen.getByTestId('Transfer');

    expect(transfer).toBeInTheDocument();
  });
});