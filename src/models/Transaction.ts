import {Account} from "./Account"

export enum TransactionType {
    DEBIT, CREDIT
}

// Technical Debt
export enum Currency {
    USD, CAD, GBP
}

export interface Transaction {
    id: number
    timestamp: Date
    action: TransactionType
    description: string
    amount: number
    currency: Currency
    account: number
}