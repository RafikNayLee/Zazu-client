import React, { forwardRef } from "react";
import icons from "../icons";
import AutoCompleteDataChooser from "./AutoCompleteDataChooser";

const ReadOnlyFeedsChooser = forwardRef(({ value, loading, onChange }, ref) => {
  const list = [
    { id: "all", name: "All" },
    { id: "read", name: "Read Only" },
    { id: "undread", name: "UnRead Only" },
  ];
  return (
    <AutoCompleteDataChooser
      dataList={list}
      value={value}
      loading={loading}
      onChange={onChange}
      name={"readOnly"}
      label={`Feeds`}
      selectAllLabel="All Feeds"
      multiple={false}
      icon={icons.read({ color: "secondary" })}
      ref={ref}
    />
  );
});

export default ReadOnlyFeedsChooser;
