import React from "react";

const CustomRadioButton = ({ value, checked, onChange, labelText }) => {
  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="form-check-label">
          {labelText}
        </label>
      </div>
    </>
  );
};

export default CustomRadioButton;
