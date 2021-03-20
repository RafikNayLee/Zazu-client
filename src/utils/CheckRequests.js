import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useGeneralContext } from "./GeneralContext";

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    const { dispatch, ACTION_TYPES } = useGeneralContext();

    useEffect(() => {
      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          if (!error || !error.response) {
            props.history.push("/500");
          } else {
            switch (error.response.status) {
              case 401:
                dispatch({
                  type: ACTION_TYPES.LOGOUT,
                });
                dispatch({
                  type: ACTION_TYPES.ERRORS,
                  payload: error.response.data.errors,
                });
                props.history.push("/login");
                break;
              case 500:
                props.history.push("/500");
                break;
              default:
                break;
            }
          }

          return Promise.reject(error);
        }
      );
    });

    return <Wrapped {...props} />;
  }
  return withRouter(CheckRequests);
};

export default checkRequests;
