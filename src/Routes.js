import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Common Routes
import Questions from './screens/Questions';
import Question from './screens/Question';
import Auth from './screens/Auth';

// Auth Components
import AuthenticatedRoute from './components/AuthenticatedRoute';

export default () => (
  <Switch>
    <AuthenticatedRoute exact path="/questions" component={Questions} />
    <AuthenticatedRoute exact path="/questions/:id" component={Question} />
    <Route component={Auth} />
  </Switch>
);
