import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGeneralContext } from "./GeneralContext";

const UnAuthRoute = ({ component: Component, ...rest }) => {
  const { state } = useGeneralContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        state.user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default UnAuthRoute;
