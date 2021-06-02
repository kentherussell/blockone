import React from 'react';
import './App.css';
import {Route, Switch, Router} from 'react-router-dom'
import Header from "../Header/Header";
import Transactions from "../Transactions/Transactions";
import browserHistory from "../../BrowserHistory";

function App() {
  return (
    <Router history={browserHistory}>
        <Header />
        <Switch>
            <Route exact path={'/transactions'} component={Transactions}/>
        </Switch>
    </Router>
  );
}

export default App;
