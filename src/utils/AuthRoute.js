import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGeneralContext } from "./GeneralContext";

const AuthRoute = ({ title, ...rest }) => {
  const { state } = useGeneralContext();

  if (!state.user) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
};

export default AuthRoute;
