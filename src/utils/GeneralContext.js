import React from "react";
import jwtDecode from "jwt-decode";

const GeneralContext = React.createContext();
export const AUTH_TOKEN_KEY = "zazu-jwtToken";

const LOADING = "LOADING";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const ACTION_TYPES = {
  LOADING,
  LOGIN,
  LOGOUT,
};

const initialState = {
  loading: false,
  user: null,
};

if (localStorage.getItem(AUTH_TOKEN_KEY)) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    initialState.user = { ...decodedToken, token };
  }
}

const generalReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case LOGOUT:
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return { ...state, user: null };
    case LOGIN:
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
      return { ...state, user: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const GeneralContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(generalReducer, initialState);

  const value = { state, dispatch, ACTION_TYPES };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

const useGeneralContext = () => {
  const context = React.useContext(GeneralContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a GeneralContextProvider");
  }
  return context;
};

export { GeneralContextProvider, useGeneralContext };
