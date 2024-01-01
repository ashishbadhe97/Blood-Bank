import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomRadioButton from "./CustomRadioButton";
import { Link } from "react-router-dom";
import {
  loginFormHandler,
  registerFormHandler,
} from "../services/authServices";

const Form = ({ formType, buttonText }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "donor",
    address: "",
    phone: "",
    website: "",
    organisationName: "",
    hospitalName: "",
  });

  const inputFieldHandler = (fieldName) => (e) => {
    return setFormData((prevState) => {
      if (fieldName === "admin" || fieldName === "donor") {
        formData["organisationName"] = "";
        formData["hospitalName"] = "";
      } else if (fieldName === "organisationName") {
        formData["name"] = "";
        formData["hospitalName"] = "";
      } else if (fieldName === "hospitalName") {
        formData["name"] = "";
        formData["organisationName"] = "";
      }
      return { ...prevState, [fieldName]: e.target.value };
    });
  };

  const formDataHandler = (e) => {
    e.preventDefault();

    if (formType === "Login") {
      loginFormHandler(formData);
    } else {
      registerFormHandler(formData);
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="form-div">
          <h2>{formType}</h2>
          <hr />
          <form onSubmit={formDataHandler}>
            <div className="radioButton-container">
              <CustomRadioButton
                value={"donor"}
                checked={formData["role"] === "donor"}
                onChange={inputFieldHandler("role")}
                labelText={"Donor"}
              />
              <CustomRadioButton
                value={"admin"}
                checked={formData["role"] === "admin"}
                onChange={inputFieldHandler("role")}
                labelText={"Admin"}
              />
              <CustomRadioButton
                value={"organisation"}
                checked={formData["role"] === "organisation"}
                onChange={inputFieldHandler("role")}
                labelText={"Organisation"}
              />
              <CustomRadioButton
                value={"hospital"}
                checked={formData["role"] === "hospital"}
                onChange={inputFieldHandler("role")}
                labelText={"Hospital"}
              />
            </div>

            {formType === "Login" && (
              <>
                <div className="inputField-container">
                  <CustomInput
                    label={"Email address"}
                    inputType={"email"}
                    onChange={inputFieldHandler("email")}
                    value={formData["email"]}
                  />
                  <CustomInput
                    label={"Password"}
                    inputType={"password"}
                    onChange={inputFieldHandler("password")}
                    value={formData["password"]}
                  />
                </div>
              </>
            )}
            {formType === "Register" && (
              <>
                <div className="inputField-container">
                  {(formData["role"] === "donor" ||
                    formData["role"] === "admin") && (
                    <CustomInput
                      label={"Name"}
                      inputType={"text"}
                      onChange={inputFieldHandler("name")}
                      value={formData["name"]}
                    />
                  )}
                  {formData["role"] === "organisation" && (
                    <>
                      <CustomInput
                        label={"Organisation Name"}
                        inputType={"text"}
                        onChange={inputFieldHandler("organisationName")}
                        value={formData["organisationName"]}
                      />
                    </>
                  )}
                  {formData["role"] === "hospital" && (
                    <>
                      <CustomInput
                        label={"Hospital Name"}
                        inputType={"text"}
                        onChange={inputFieldHandler("hospitalName")}
                        value={formData["hospitalName"]}
                      />
                    </>
                  )}
                  <CustomInput
                    label={"Email address"}
                    inputType={"email"}
                    onChange={inputFieldHandler("email")}
                    value={formData["email"]}
                  />
                  <CustomInput
                    label={"Password"}
                    inputType={"password"}
                    onChange={inputFieldHandler("password")}
                    value={formData["password"]}
                  />

                  <CustomInput
                    label={"Address"}
                    inputType={"text"}
                    onChange={inputFieldHandler("address")}
                    value={formData["address"]}
                  />
                  <CustomInput
                    label={"Phone"}
                    inputType={"text"}
                    onChange={inputFieldHandler("phone")}
                    value={formData["phone"]}
                  />
                  <CustomInput
                    label={"Website"}
                    inputType={"text"}
                    onChange={inputFieldHandler("website")}
                    value={formData["website"]}
                  />
                </div>
              </>
            )}

            <div className="button-container">
              <button type="submit" className="btn btn-primary">
                {buttonText}
              </button>
              {formType === "Register" ? (
                <p>
                  Already Registered? Login
                  <Link to="/login"> Here</Link>
                </p>
              ) : (
                <p>
                  Not Registered? SignUp
                  <Link to="/register"> Here</Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
