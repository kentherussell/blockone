import {Account} from "../models/Account";

const accounts: Account[] = [
    {id: 84013848436, name: "Checking"},
    {id: 48239483839, name: "Savings"},
    {id: 85948529984, name: "Money Market"},
    {id: 39489123473, name: "401K"}
]

export function getAccounts() {
    return Promise.resolve(accounts)
}
