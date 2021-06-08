import React from 'react';
import './App.css';
import {Route, Router, Switch} from 'react-router-dom'
import Header from "../Header/Header";
import TransactionsPage from "../TransactionsPage/TransactionsPage";
import browserHistory from "../../BrowserHistory";
import TransferPage from "../TransferPage/TransferPage";

function App() {
    return (
        <Router history={browserHistory}>
            <Header/>
            <Switch>
                <Route exact path={'/transactions'} component={TransactionsPage}/>
                <Route exact path={'/'} component={TransactionsPage}/>
                <Route exact path={'/transfer'} component={TransferPage}/>
            </Switch>
        </Router>
    );
}

export default App;
