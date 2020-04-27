import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);

export default Routes;
