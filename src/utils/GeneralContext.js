import React from "react";
import jwtDecode from "jwt-decode";
import { getDefaultVoice } from "./speech";

const GeneralContext = React.createContext();
export const AUTH_TOKEN_KEY = "zazu-jwtToken";

const LOADING = "LOADING";
const ERRORS = "ERRORS";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const NEWS = "news";
const FEEDS = "feeds";
const CATEGORIES = "categories";
const VOICE = "VOICE";

const ACTION_TYPES = {
  LOADING,
  ERRORS,
  LOGIN,
  LOGOUT,
  NEWS,
  FEEDS,
  CATEGORIES,
  VOICE,
};

const initialState = {
  loading: false,
  user: null,
  news: [],
  feeds: [],
  categories: [],
  errors: {},
  voice: getDefaultVoice(),
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
    case ERRORS:
      return { ...state, errors: action.payload };
    case LOGOUT:
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return { ...state, user: null };
    case LOGIN:
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
      return { ...state, user: action.payload };
    case NEWS:
      return { ...state, news: action.payload };
    case FEEDS:
      return { ...state, feeds: action.payload };
    case CATEGORIES:
      return { ...state, categories: action.payload };
    case VOICE:
      return { ...state, voice: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const GeneralContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(generalReducer, initialState);

  const setErrors = (errors) =>
    dispatch({
      type: ACTION_TYPES.ERRORS,
      payload: errors,
    });

  const setLoading = (loading) =>
    dispatch({
      type: ACTION_TYPES.LOADING,
      payload: loading,
    });

  const value = { state, dispatch, ACTION_TYPES, setErrors, setLoading };

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
