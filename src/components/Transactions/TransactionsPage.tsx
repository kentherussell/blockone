import React, {useEffect, useState} from 'react';
import styles from './Transactions.module.css';
import {
    Box,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    NativeSelect, Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@material-ui/core";
import {Transaction} from "../../models/Transaction";
import {Account} from "../../models/Account";
import {getAccounts} from "../../services/AccountService";
import {getTransactionsByAccountId} from "../../services/TransactionService";

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [accounts, setAccounts] = useState<Account[]>([])
    const [currentAccount, setCurrentAccount] = useState<Account | null>(null)


    useEffect(() => {
        const retrievedAccounts = getAccounts()
        setAccounts(retrievedAccounts)
        setCurrentAccount(retrievedAccounts[0])
    }, [])

    useEffect(() => {
        currentAccount && setTransactions(getTransactionsByAccountId(currentAccount.id))
    }, [currentAccount])


    function handleAccountChange(e) {
        setCurrentAccount(accounts.find(account => account.id === Number(e.target.value)) || null)
    }

    return (
        <Container className={styles.Transactions} data-testid="TransactionsPage">
            <Box textAlign="right" marginTop="15px">
                <FormControl>
                    <InputLabel htmlFor="account-choice">Select Account</InputLabel>
                    <NativeSelect
                        value={currentAccount?.id}
                        onChange={handleAccountChange}
                        inputProps={{
                            id: 'account-choice',
                        }}
                    >
                        {accounts.map(account => (<option key={account.id} value={account.id}>{account.name}</option>))}
                    </NativeSelect>
                    <FormHelperText>Account Number: {currentAccount?.id}</FormHelperText>
                </FormControl>
            </Box>
            <Typography variant="h5">
                Transactions
            </Typography>
            <Box marginTop="10px" marginBottom="65px">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Currency</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!transactions.length &&
                            <TableRow><TableCell colSpan={5}><Box textAlign="center">No Transactions Available</Box></TableCell></TableRow>
                            }
                            {transactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.timestamp}</TableCell>
                                    <TableCell>{transaction.action}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell align="right">{transaction.amount}</TableCell>
                                    <TableCell>{transaction.currency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>)
}

export default TransactionsPage;
