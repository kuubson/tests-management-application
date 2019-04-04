import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/login/Login'
import Register from './components/register/Register'
import Account from './components/account/Account';
import AddQuestion from './components/account/Teacher/AddQuestion';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="tests-management-application">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/account" component={Account} />
            <Route path="/add" component={AddQuestion} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
