import React, { forwardRef } from "react";
import { useGeneralContext } from "../../utils/GeneralContext";
import icons from "../icons";
import AutoCompleteDataChooser from "./AutoCompleteDataChooser";

const CategoriesChooser = forwardRef(({ value, loading, onChange }, ref) => {
  const context = useGeneralContext();
  const { state } = context;

  return (
    <AutoCompleteDataChooser
      dataList={state.categories}
      value={value}
      loading={loading}
      onChange={onChange}
      name={"categories"}
      label={`Categories`}
      selectAllLabel="All Categories"
      multiple={true}
      icon={icons.categories({ color: "primary" })}
      ref={ref}
    />
  );
});

export default CategoriesChooser;
