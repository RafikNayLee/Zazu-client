const R = require("ramda");

export const isAuthError = (err) => R.path(["response", "status"])(err) === 401;

export const handleError = ({ setErrors }) => (err) => {
  const errors = R.path(["response", "data", "errors"])(err);

  if (isAuthError(err)) {
    throw err;
  }
  if (errors) {
    setErrors(errors);
  } else {
    throw err;
  }
};
