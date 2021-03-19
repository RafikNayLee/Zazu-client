import { useState } from "react";

const useForm = (callback, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChecked = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const handleDateChange = (name, date) => {
    setValues({
      ...values,
      [name]: !date ? "" : date.toISOString(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onChecked,
    handleDateChange,
    onSubmit,
    values,
    setValues,
  };
};

export default useForm;
