import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link', async() => {
    const {getByTestId} = await render(<App/>)
    expect(getByTestId('Header')).toBeInTheDocument()
})
