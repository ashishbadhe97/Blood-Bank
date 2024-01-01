import React from "react";

const CustomInput = ({label, inputType, onChange, value}) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">
          {label}
        </label>
        <input type={inputType} className="form-control"  value={value} onChange={onChange}/>
      </div>
    </>
  );
};

export default CustomInput;
