import React, {useEffect, useState} from 'react';
import styles from './TransferPage.module.css';
import Alert from '@material-ui/lab/Alert'
import {Box, Button, Container, FormControl, Input, InputLabel, NativeSelect, Typography} from "@material-ui/core";
import {getAccounts} from "../../services/AccountService";
import {Account} from "../../models/Account";
import NumberFormat from 'react-number-format';
import {transferMoney} from "../../services/TransactionService";

const TransferPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [accountFrom, setAccountFrom] = useState<number>(0)
    const [accountTo, setAccountTo] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [hasAccountToError, isAccountToError] = useState<boolean>(false)
    const [hasAccountFromError, isAccountFromError] = useState<boolean>(false)
    const [hasAmountError, isAmountError] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [transferInProgress, isTransferInProgress] = useState<boolean>(false)
    const [transferComplete, isTransferComplete] = useState<boolean>(false)


    useEffect(() => {
        getAccounts()
            .then(retrievedAccounts => setAccounts(retrievedAccounts))
    }, [])

    useEffect(() => {
        isAccountFromError(false)
        isAccountToError(false)
        isAmountError(false)
        setErrorMessages([])
    }, [accountTo, accountFrom, amount])


    const initiateTransfer = () => {
        const currentErrorMessages: string[] = []
        if (!accountFrom) {
            isAccountFromError(true)
            currentErrorMessages.push('The account you would like to transfer from must be set.')
        }
        if (!accountTo) {
            isAccountToError(true)
            currentErrorMessages.push('The account you would like to transfer to must be set.')
        }
        if (accountTo === accountFrom) {
            isAccountFromError(true)
            isAccountToError(true)
            currentErrorMessages.push('Cannot transfer money from account to itself.')
        }
        if (!amount || amount < 0) {
            isAmountError(true)
            currentErrorMessages.push("Transfer amount must be set and cannot be a negative number.")
        }
        setErrorMessages(currentErrorMessages)
        if (!currentErrorMessages.length) {
            isTransferInProgress(true)
            transferMoney(accountTo, accountFrom, amount)
                .then(successful => {
                    if (successful) {
                        isTransferInProgress(false)
                        isTransferComplete(true)
                    }
                })
        }
    }
    return (
        <Container className={styles.Transfer} data-testid="TransferPage">
            <Box marginTop="15px">
                <Typography variant="h5">
                    Transfer Money
                </Typography>
            </Box>
            <Box marginTop="10px" marginBottom="65px">
                <form noValidate autoComplete="off">
                    <Box marginBottom="20px">
                        <FormControl error={hasAccountFromError} disabled={transferInProgress}>
                            <InputLabel htmlFor="account-from">From</InputLabel>
                            <NativeSelect
                                value={accountFrom}
                                inputProps={{
                                    id: 'account-from'
                                }}
                                data-testid='account-from-dropdown'
                                onChange={e => setAccountFrom(Number(e.target.value))}
                            >
                                <option value="0"/>
                                {accounts.map(account => (<option key={account.id}
                                                                  value={account.id}>{account.name} - {account.id}</option>))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box marginBottom="20px">
                        <FormControl error={hasAccountToError} disabled={transferInProgress}>
                            <InputLabel htmlFor="account-to">To</InputLabel>
                            <NativeSelect
                                value={accountTo}
                                inputProps={{
                                    id: 'account-to',
                                }}
                                data-testid='account-to-dropdown'
                                onChange={e => setAccountTo(Number(e.target.value))}
                            >
                                <option value="0"/>
                                {accounts.map(account => (<option key={account.id}
                                                                  value={account.id}>{account.name} - {account.id}</option>))}
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box marginBottom="20px">
                        <FormControl error={hasAmountError} disabled={transferInProgress}>
                            <InputLabel htmlFor="transfer-amount">Amount</InputLabel>
                            <NumberFormat
                                id="transfer-amount"
                                data-testid='amount-input'
                                value={amount}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                thousandSeparator={true}
                                customInput={Input}
                                onValueChange={(data) => setAmount(Number(data.value))}
                                prefix={'$'}/>
                        </FormControl>

                    </Box>
                    <Box marginBottom="25px">
                        <Button onClick={initiateTransfer} data-testid='start-transfer-button' variant="contained"
                                color="primary">
                            Transfer Funds
                        </Button>
                    </Box>
                    {errorMessages.map(message => <Alert role="error-message" key={message}
                                                         severity="error">{message}</Alert>)}
                    {transferComplete && <Alert role="success-message" severity="success">Successfully transferred money.</Alert>}
                </form>
            </Box>
        </Container>
    )
}

export default TransferPage;
