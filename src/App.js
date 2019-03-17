import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="tests-management-application">
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
