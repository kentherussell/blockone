import '@testing-library/jest-dom/extend-expect';
import * as AccountService from "./AccountService";

describe('AccountService', () => {
    test('it should return the correct number of accounts', async () => {
        const accounts = await AccountService.getAccounts()
        expect(accounts).toHaveLength(4)
    })

})