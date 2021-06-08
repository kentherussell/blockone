import React from 'react';
import {render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransactionsPage from './TransactionsPage';

import * as TransactionService from '../../services/TransactionService'
import * as AccountService from '../../services/AccountService'
import {Account} from "../../models/Account";

describe('<TransactionsPage />', () => {
    const exampleAccount: Account = {id: 1234, name: 'Example'}
    const accountsMock = jest.spyOn(AccountService, "getAccounts")

    beforeEach(() => accountsMock.mockReturnValue(Promise.resolve([exampleAccount])))

    test('it should mount', () => {
        const {getByTestId} = render(<TransactionsPage/>)
        expect(getByTestId('TransactionsPage')).toBeInTheDocument()
    })

    test('should properly show account dropdown', () => {
        accountsMock.mockReturnValue(Promise.resolve([exampleAccount]))
        const {getByTestId} = render(<TransactionsPage/>);
        expect(getByTestId('account-dropdown')).toBeVisible()
    })

    test('should properly render accounts and choose the first one by default', async () => {
        const exampleReturn = [exampleAccount]
        accountsMock.mockReturnValue(Promise.resolve(exampleReturn))
        const {getByTestId, getByText} = render(<TransactionsPage/>);
        expect(accountsMock).toHaveBeenCalled()
        await waitFor(() => {
            expect(getByTestId('account-dropdown').getElementsByTagName('option').length).toBe(exampleReturn.length)
            expect(getByText(`Account Number: ${exampleAccount.id}`)).toBeInTheDocument()
        })
    })

    test('should properly display transactions', async () => {
        const getTransactionsMock = jest.spyOn(TransactionService, 'getTransactionsByAccountId')
        const {getByTestId} = render(<TransactionsPage/>)
        expect(getByTestId('transaction-table')).toBeInTheDocument()
        await waitFor(() => expect(getTransactionsMock).toHaveBeenCalled())
        await waitFor(() => expect(getByTestId('transaction-table').childElementCount > 1))
    })
})