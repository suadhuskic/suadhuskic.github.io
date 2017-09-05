import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {  BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import store from './store';
import NavBar from './containers/NavBar';
import MainContainer from './containers/MainContainer';
import ViewAll from './containers/ViewAll';
import AddNew from './containers/AddNew';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <NavBar />
            <MainContainer>
              <Route exact path="/" component={ViewAll} />
              <Route exact path="/react-inventory-production/index.html" component={ViewAll} />
              <Route exact path="/add" component={AddNew} />
            </MainContainer>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
