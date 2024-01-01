import React from "react";
import Form from "../../components/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

export const RegisterPage = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      <div className="authPage-container">
        <div className="banner-container">
          <img src="/assets/images/banner2.jpeg" alt="blood bank banner 2" />
        </div>
        <Form formType={"Register"} buttonText={"Register"} />
        {loading && <Spinner />}
      </div>
    </>
  );
};
