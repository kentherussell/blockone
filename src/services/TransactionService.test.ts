import '@testing-library/jest-dom/extend-expect';
import * as TransactionService from "./TransactionService";
import {getTransactionsByAccountId} from "./TransactionService";
import {getAccounts} from "./AccountService";
import {Account} from "../models/Account";
import {TransactionType} from "../models/Transaction";

describe('TransactionService', () => {

    let accounts: Account[] = []

    jest.setTimeout(30000);
    beforeAll(async () => {
        accounts = await getAccounts()
    })



    test('it should return the correct transactions', async () => {
        for (const account of accounts) {
            const transactions = await getTransactionsByAccountId(account.id)
            expect(transactions.every(transaction => transaction.account === account.id)).toBeTruthy()
        }
    })

    test('should transfer money correctly', async () => {
        const amount = 58948343.44
        await TransactionService.transferMoney(accounts[0].id, accounts[1].id, amount)
        const transactionsList1 = await getTransactionsByAccountId(accounts[0].id)
        const transactionsList2 = await getTransactionsByAccountId(accounts[1].id)
        expect(transactionsList1.some(transaction => transaction.action === TransactionType.CREDIT && transaction.amount === amount)).toBeTruthy()
        expect(transactionsList2.some(transaction => transaction.action === TransactionType.DEBIT && transaction.amount === amount)).toBeTruthy()
    })

})