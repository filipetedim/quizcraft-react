import React from "react";
import { Route, Switch } from "react-router-dom";

// Common Routes
import Questions from "./screens/Questions";
import Auth from "./screens/Auth";

// Auth Components
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export default () => (
  <Switch>
    <AuthenticatedRoute exact path="/" component={Questions} />
    <Route component={Auth} />
  </Switch>
);
