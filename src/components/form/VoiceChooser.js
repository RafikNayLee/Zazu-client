import React, { forwardRef } from "react";
import { getListOfVoices } from "../../utils/speech";
import icons from "../icons";
import AutoCompleteDataChooser from "./AutoCompleteDataChooser";

const VoiceChooser = forwardRef(({ value, onChange, loading }, ref) => {
  const voices = getListOfVoices();

  return (
    <AutoCompleteDataChooser
      dataList={voices.map((v) => ({
        id: v.id,
        name: v.name,
      }))}
      value={value}
      loading={loading}
      onChange={onChange}
      name={"voice"}
      label={`Voice`}
      selectAllLabel="..."
      multiple={false}
      icon={icons.voice({ color: "secondary" })}
      ref={ref}
    />
  );
});

export default VoiceChooser;
