import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransactionsPage from './TransactionsPage';

describe('<Transactions />', () => {
  test('it should mount', () => {
    render(<TransactionsPage />);
    
    const transactions = screen.getByTestId('Transactions');

    expect(transactions).toBeInTheDocument();
  });
});