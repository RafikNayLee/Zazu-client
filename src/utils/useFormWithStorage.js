import { useEffect } from "react";
import useForm from "./useForm";

const useFormWithStorage = (callback, initialState = {}, storageKey) => {
  const {
    onChange,
    onChecked,
    handleDateChange,
    onSubmit,
    values,
    setValues,
  } = useForm(
    callback,
    localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : initialState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [values]);

  return {
    onChange,
    onChecked,
    handleDateChange,
    onSubmit,
    values,
    setValues,
  };
};

export default useFormWithStorage;
