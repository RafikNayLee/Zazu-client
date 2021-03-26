import axios from "axios";
import { handleError } from "./handleError";

export const getNewsSources = (context) => {
  const { state, dispatch, ACTION_TYPES, setErrors, setLoading } = context;
  if (state && state.user) {
    setErrors({});
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/news`, {
        headers: {
          "x-access-token": state.user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTION_TYPES.NEWS,
          payload: res.data,
        });
      })
      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }
};
export const getCategories = (context) => {
  const { state, dispatch, ACTION_TYPES, setErrors, setLoading } = context;
  if (state && state.user) {
    setErrors({});
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/categories`, {
        headers: {
          "x-access-token": state.user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTION_TYPES.CATEGORIES,
          payload: res.data,
        });
      })
      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }
};

export const getFeeds = (context) => {
  const { state, dispatch, ACTION_TYPES, setErrors, setLoading } = context;
  if (state && state.user) {
    setErrors({});
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/feeds`, {
        headers: {
          "x-access-token": state.user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTION_TYPES.FEEDS,
          payload: res.data,
        });
      })

      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }
};

export const readFeed = (context, id) => {
  const { state, dispatch, ACTION_TYPES, setErrors, setLoading } = context;
  setErrors({});
  setLoading(false);
  axios
    .post(`${process.env.REACT_APP_BACKEND_API_URL}/feeds/read/${id}`, null, {
      headers: {
        "x-access-token": state.user.token,
      },
    })
    .then((res) => {
      setLoading(false);
      dispatch({
        type: ACTION_TYPES.FEEDS,
        payload: state.feeds.map((f) => {
          if (f.id === id) {
            return res.data;
          } else return f;
        }),
      });
    })
    .catch((err) => {
      setLoading(false);
      handleError({ setErrors })(err);
    });
};

export const setFeedCategories = (context, id, categories) => {
  const { state, dispatch, ACTION_TYPES, setErrors, setLoading } = context;
  setErrors({});
  setLoading(false);
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_API_URL}/feeds/${id}/categories`,
      {
        categories,
      },
      {
        headers: {
          "x-access-token": state.user.token,
        },
      }
    )
    .then((res) => {
      setLoading(false);
      dispatch({
        type: ACTION_TYPES.FEEDS,
        payload: state.feeds.map((f) => {
          if (f.id === id) {
            return res.data;
          } else return f;
        }),
      });
    })
    .catch((err) => {
      setLoading(false);
      handleError({ setErrors })(err);
    });
};

export const addDataElement = ({
  context,
  elementKey,
  values,
  onCompleted,
  setErrors,
  setLoading,
}) => {
  const { state, dispatch } = context;
  setLoading(true);
  axios
    .post(`${process.env.REACT_APP_BACKEND_API_URL}/${elementKey}`, values, {
      headers: {
        "x-access-token": state.user.token,
      },
    })
    .then((res) => {
      dispatch({
        type: elementKey,
        payload: [...state[elementKey], res.data],
      });
      setLoading(false);
      onCompleted();
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      setLoading(false);
    });
};

export const editDataElement = ({
  context,
  elementKey,
  values,
  id,
  onCompleted,
  setErrors,
  setLoading,
}) => {
  const { state, dispatch } = context;
  setLoading(true);
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_API_URL}/${elementKey}/${id}`,
      values,
      {
        headers: {
          "x-access-token": state.user.token,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: elementKey,
        payload: state[elementKey].map((el) => {
          if (res.data.id === el.id) {
            return res.data;
          } else {
            return el;
          }
        }),
      });
      setLoading(false);
      onCompleted();
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      setLoading(false);
    });
};

export const deleteElementDataFn = (context, elementName, id) => () => {
  const { state, dispatch, setErrors, setLoading } = context;
  if (state && state.user) {
    setErrors({});
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_API_URL}/${elementName}/${id}`, {
        headers: {
          "x-access-token": state.user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: elementName,
          payload: state[elementName].filter((el) => el.id !== id),
        });
      })
      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }
};

export const loadFeeds = (context) => {
  const { state, dispatch, setErrors, setLoading, ACTION_TYPES } = context;
  if (state && state.user) {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/loadFeeds`, {
        headers: {
          "x-access-token": state.user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTION_TYPES.FEEDS,
          payload: [...state.feeds, ...res.data],
        });
      })

      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }
};
