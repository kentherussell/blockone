import React from 'react';
import {getByText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import {MemoryRouter} from 'react-router-dom';

describe('<Header />', () => {

  test('it should mount', () => {
    render(<Header />, {wrapper: MemoryRouter});
    
    const header = screen.getByTestId('Header');

    expect(header).toBeInTheDocument();
  });


  test('it should show title', () => {
    const {getByText} = render(<Header/>, {wrapper: MemoryRouter})
    expect(getByText('block.one')).toBeInTheDocument()

  })

  test('it should show Transfer button', () => {
    const {getByTestId} = render(<Header/>, {wrapper: MemoryRouter})
    expect(getByTestId('TransferNavButton')).toBeVisible()

  })

  test('it should show Transaction button', () => {
    const {getByTestId} = render(<Header/>, {wrapper: MemoryRouter})
    expect(getByTestId('TransactionNavButton')).toBeVisible()

  })



});