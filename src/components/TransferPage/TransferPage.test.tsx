import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransferPage from './TransferPage';
import {Account} from "../../models/Account";
import * as AccountService from "../../services/AccountService";
import * as TransactionService from "../../services/TransactionService"

describe('<TransferPage />', () => {

    const exampleAccounts: Account[] = [
        {id: 1, name: 'Example1'},
        {id: 2, name: 'Example2'},
        {id: 3, name: 'Example3'},
        {id: 4, name: 'Example4'}
    ]
    const accountsMock = jest.spyOn(AccountService, "getAccounts")
    const transferMoney = jest.spyOn(TransactionService, "transferMoney")
    beforeEach(() => {
        accountsMock.mockReturnValue(Promise.resolve(exampleAccounts))
        transferMoney.mockReturnValue(Promise.resolve(true))
    })

    test('it should mount', async () => {
        const {getByTestId} = render(<TransferPage/>)
        expect(getByTestId('TransferPage')).toBeInTheDocument()
    })

    test('should properly show account dropdowns', async () => {
        const {getByTestId} = render(<TransferPage/>)
        expect(getByTestId('account-from-dropdown')).toBeVisible()
        expect(getByTestId('account-to-dropdown')).toBeVisible()
        expect(accountsMock).toHaveBeenCalled()
        await waitFor(() => {
            expect(getByTestId('account-from-dropdown')
                .getElementsByTagName('option').length)
                .toBe(exampleAccounts.length + 1)
            expect(getByTestId('account-to-dropdown')
                .getElementsByTagName('option').length)
                .toBe(exampleAccounts.length + 1)
        })
    })

    test('should properly show amount', () => {
        const {getByTestId} = render(<TransferPage/>)
        expect(getByTestId('amount-input')).toBeVisible()
    })

    test('should show all possible error messages', async () => {
        const {getByTestId, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.click(getByTestId('start-transfer-button'))
        await waitFor(() => expect(queryAllByRole('error-message')).toHaveLength(4))
    })

    test('should process properly and call correct service functions', async () => {
        const {getByTestId, queryAllByRole} = await render(<TransferPage/>)
        const transferMoney = jest.spyOn(TransactionService, "transferMoney")
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[0].id}})
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(queryAllByRole('error-message')).toHaveLength(0)
        expect(transferMoney).toHaveBeenCalled()
    })

    test('should error out if no amount set', async () => {
        const {getByTestId, getByText, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[0].id}})
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(getByText("Transfer amount must be set and cannot be a negative number.")).toBeInTheDocument()
        expect(queryAllByRole('error-message')).toHaveLength(1)
    })

    test('should error out if accounts are the same', async () => {
        const {getByTestId, getByText, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(getByText('Cannot transfer money from account to itself.')).toBeInTheDocument()
        expect(queryAllByRole('error-message')).toHaveLength(1)
    })

    test('should error out if account from not set', async () => {
        const {getByTestId, getByText, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(getByText('The account you would like to transfer from must be set.')).toBeInTheDocument()
        expect(queryAllByRole('error-message')).toHaveLength(1)
    })

    test('should error out if account to not set', async () => {
        const {getByTestId, getByText, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(getByText('The account you would like to transfer to must be set.')).toBeInTheDocument()
        expect(queryAllByRole('error-message')).toHaveLength(1)
    })

    test('should error out with multiple errors, both with amount and account', async () => {
        const {getByTestId, getByText, queryAllByRole} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.click(getByTestId('start-transfer-button'))
        expect(getByText('The account you would like to transfer to must be set.')).toBeInTheDocument()
        expect(getByText("Transfer amount must be set and cannot be a negative number.")).toBeInTheDocument()
        expect(queryAllByRole('error-message')).toHaveLength(2)
    })

    test('should disable all form controls on submission', async () => {
        const {getByTestId, container} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[0].id}})
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        container.querySelectorAll('select,input').forEach(elem => expect(elem).toBeDisabled())
    })

    test('should enable all form controls after success', async () => {
        const {getByTestId, container} = await render(<TransferPage/>)
        fireEvent.change(getByTestId('account-from-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[0].id}})
        fireEvent.change(getByTestId('account-to-dropdown').getElementsByTagName('select')[0], {target: {value: exampleAccounts[1].id}})
        fireEvent.change(getByTestId('amount-input').getElementsByTagName('input')[0], {target: {value: 600.54}})
        fireEvent.click(getByTestId('start-transfer-button'))
        await Promise.resolve()
        container.querySelectorAll('select,input').forEach(elem => expect(elem).toBeEnabled())
    })


})