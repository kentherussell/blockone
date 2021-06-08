import {Currency, Transaction, TransactionType} from "../models/Transaction";

const STORAGE_KEY: string = 'fake-transactions'

const transactions: Transaction[] = require('../MOCK_DATA.json')

export function getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {

    return Promise.resolve(transactions
        .concat(getTransactionStorage())
        .filter(transaction => transaction.account === accountId)
        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1))
}

export function transferMoney(accountTo: number, accountFrom: number, amount: number) {
    return new Promise<boolean>(resolve => {
        const baseTransaction = {
            timestamp: new Date().toISOString().substring(0, 10),
            description: 'Account TransferPage',
            currency: Currency.USD,
            amount: amount
        }
        saveTransactions(
            {
                ...baseTransaction,
                id: Math.floor(Math.random() * 10000),
                account: accountFrom,
                action: TransactionType.DEBIT
            },
            {
                ...baseTransaction,
                id: Math.floor(Math.random() * 10000),
                account: accountTo,
                action: TransactionType.CREDIT
            })
        setTimeout(() => resolve(true), 5000)  // replicate longer server response time
    })
}

function getTransactionStorage(): Transaction[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

function saveTransactions(...newTransactions: Transaction[]): void {
    const transactionStorage = getTransactionStorage()
    transactionStorage.push(...newTransactions)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionStorage))
}

