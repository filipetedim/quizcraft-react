import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

export default ({ component: ParentRoute, props: parentProps, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // If token is missing
      if (!Cookie.get('qc-token')) {
        return <Redirect to="/auth" />;
      }

      return <ParentRoute {...props} {...parentProps} />;
    }}
  />
);
