import React, { useState } from "react";
import useForm from "../utils/useForm";

import CustomDialog from "./CustomDialog";
import CustomForm from "./CustomForm";
import { useGeneralContext } from "../utils/GeneralContext";
import { addDataElement, editDataElement } from "../utils/api";

const AddElement = ({
  action,
  id,
  elementKey,
  initialValues,
  fieldLabels,
  title,
  subTitle,
  icon,
  dialogOpen,
  setDialogOpen,
}) => {
  const { onChange, onSubmit, values, setValues } = useForm(
    mutate,
    initialValues
  );
  const context = useGeneralContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);

  const onCompleted = () => {
    if (action === "add") {
      setValues(initialValues);
      handleDialogClose();
    } else if (action === "edit") {
      handleDialogClose();
    }
  };
  function mutate() {
    if (action === "add") {
      addDataElement({
        context,
        elementKey,
        values,
        onCompleted,
        setErrors,
        setLoading,
      });
    } else if (action === "edit") {
      editDataElement({
        context,
        elementKey,
        id,
        values,
        onCompleted,
        setErrors,
        setLoading,
      });
    }
  }
  return (
    <CustomDialog
      open={dialogOpen}
      handleClose={handleDialogClose}
      handleSubmit={onSubmit}
      name="add-element-dialog"
      title={title}
      subTitle={subTitle}
      icon={icon}
      loading={loading}
    >
      <CustomForm
        values={values}
        onChange={onChange}
        errors={errors}
        fieldLabels={fieldLabels}
      />
    </CustomDialog>
  );
};

AddElement.defaultProps = {
  action: "add",
};
export default AddElement;
