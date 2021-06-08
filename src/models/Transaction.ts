export enum TransactionType {
    DEBIT = "DEBIT", CREDIT = "CREDIT"
}

// Technical Debt
export enum Currency {
    USD = "USD", CAD = "CAD", GBP = "GBP"
}

export interface Transaction {
    id: number
    timestamp: string
    action: TransactionType
    description?: string
    amount: number
    currency: Currency
    account: number
}