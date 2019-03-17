import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register';
import Account from './components/Account'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="tests-management-application">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
