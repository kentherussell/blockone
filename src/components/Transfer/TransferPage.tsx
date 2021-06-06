import React, {useEffect, useState} from 'react';
import styles from './Transfer.module.css';
import Alert from '@material-ui/lab/Alert'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    InputLabel, List, ListItem, ListItemText,
    NativeSelect,
    TextField,
    Typography
} from "@material-ui/core";
import {getAccounts} from "../../services/AccountService";
import {Account} from "../../models/Account";

const TransferPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [accountFrom, setAccountFrom] = useState<number | null>(null)
    const [accountTo, setAccountTo] = useState<number | null>(null)
    const [amount, setAmount] = useState<number | null>(null)
    const [hasAccountToError, isAccountToError] = useState<boolean>(false)
    const [hasAccountFromError, isAccountFromError] = useState<boolean>(false)
    const [hasAmountError, isAmountError] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    useEffect(() => {
        const retrievedAccounts = getAccounts()
        setAccounts(retrievedAccounts)
    }, [])

    useEffect(() => {
        isAccountFromError(false)
        isAccountToError(false)
        isAmountError(false)
        setErrorMessages([])
    }, [accountTo, accountFrom, amount])

    // TODO validation
    // TODO tests
    // TODO add transaction functionality

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
            currentErrorMessages.push('Accounts must be different')
        }

        setErrorMessages(currentErrorMessages)
    }

    return (
        <Container className={styles.Transfer} data-testid="Transfer">
            <Box marginTop="15px">
                <Typography variant="h5">
                    Transfer Money
                </Typography>
            </Box>
            <Box marginTop="10px" marginBottom="65px">
                <form noValidate autoComplete="off">
                    <Box marginBottom="20px">
                        <FormControl error={hasAccountFromError}>
                            <InputLabel htmlFor="account-from">From</InputLabel>
                            <NativeSelect
                                value={accountFrom}
                                inputProps={{
                                    id: 'account-from',
                                }}
                                onChange={e => setAccountFrom(Number(e.target.value))}
                            >
                                <option value=""/>
                                {accounts.map(account => (<option key={account.id} value={account.id}>{account.name} - {account.id}</option>))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box marginBottom="20px">
                        <FormControl error={hasAccountToError}>
                            <InputLabel htmlFor="account-to">To</InputLabel>
                            <NativeSelect
                                value={accountTo}
                                inputProps={{
                                    id: 'account-to',
                                }}
                                onChange={e => setAccountTo(Number(e.target.value))}
                            >
                                <option value=""/>
                                {accounts.map(account => (<option key={account.id} value={account.id}>{account.name} - {account.id}</option>))}
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box marginBottom="20px">
                        <TextField
                            error={hasAmountError}
                            value={amount}
                            id="filled-number"
                            label="Amount"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </Box>
                    <Button onClick={initiateTransfer} variant="contained" color="primary">
                        Transfer Funds
                    </Button>
                    {errorMessages.map(message => <Alert severity="error">{message}</Alert>)}
                </form>
            </Box>
        </Container>
    )
}

export default TransferPage;
