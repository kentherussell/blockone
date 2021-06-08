import React from 'react';
import styles from './Header.module.css';
import {Link} from 'react-router-dom';
import {AppBar, IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ListAltIcon from '@material-ui/icons/ListAlt';

const Header: React.FC = () => (
    <div className={styles.Header} data-testid="Header">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={styles.Title}>
                    block.one
                </Typography>
                <div className={styles.ActionIcons}>
                    <Tooltip title="Transactions List">
                        <Link to="/transactions" data-testid="TransactionNavButton">
                            <IconButton aria-label="Transactions List">
                                <ListAltIcon className={styles.IconLink}/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Transfer Money">
                        <Link to="/transfer" data-testid="TransferNavButton">
                            <IconButton aria-label="Transfer Money">
                                <SwapHorizIcon className={styles.IconLink}/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    </div>
);

export default Header;
