import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.isLoggedIn ? (
        Component ? (
          <Component {...props} />
        ) : (
          props.children
        )
      ) : (
        <Redirect to="./signin" />
      )}
    </Route>
  );
};

export default ProtectedRoute;
