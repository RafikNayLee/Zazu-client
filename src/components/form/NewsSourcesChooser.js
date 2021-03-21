import React, { forwardRef } from "react";
import { useGeneralContext } from "../../utils/GeneralContext";
import icons from "../icons";
import AutoCompleteDataChooser from "./AutoCompleteDataChooser";

const NewsSourcesChooser = forwardRef(({ value, loading, onChange }, ref) => {
  const context = useGeneralContext();
  const { state } = context;

  return (
    <AutoCompleteDataChooser
      dataList={state.news}
      value={value}
      loading={loading}
      onChange={onChange}
      name={"news"}
      label={`News Sources`}
      selectAllLabel="All News Sources"
      multiple={true}
      icon={icons.news({ color: "primary" })}
      ref={ref}
    />
  );
});

export default NewsSourcesChooser;
