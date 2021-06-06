import {Currency, Transaction, TransactionType} from "../models/Transaction";


const transactions: Transaction[] = require('../MOCK_DATA.json')

export function getTransactionsByAccountId(accountId: number) {
    return transactions.filter(transaction => transaction.account === accountId)
        .sort((a,b) => a.timestamp > b.timestamp ? -1 : 1)
}

export function createTransferTransaction(accountTo: number, accountFrom: number, amount: number) {
    // transactions.push()
    // localstorage?
}