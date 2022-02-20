import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {props.isLoggedIn ? (
        Component ? (
          <Component {...props} />
        ) : (
          props.children
        )
      ) : (
        <Redirect to="./" />
      )}
    </Route>
  );
}

export default ProtectedRoute;
