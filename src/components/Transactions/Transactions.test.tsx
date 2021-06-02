import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Transactions from './Transactions';

describe('<Transactions />', () => {
  test('it should mount', () => {
    render(<Transactions />);
    
    const transactions = screen.getByTestId('Transactions');

    expect(transactions).toBeInTheDocument();
  });
});