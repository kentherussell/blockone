import React from 'react';
import './App.css';
import {Route, Switch, Router} from 'react-router-dom'
import Header from "../Header/Header";
import TransactionsPage from "../Transactions/TransactionsPage";
import browserHistory from "../../BrowserHistory";
import TransferPage from "../Transfer/TransferPage";

function App() {
  return (
    <Router history={browserHistory}>
        <Header />
        <Switch>
            <Route exact path={'/transactions'} component={TransactionsPage}/>
            <Route exact path={'/'} component={TransactionsPage}/>
            <Route exact path={'/transfer'} component={TransferPage}/>
        </Switch>
    </Router>
  );
}

export default App;
