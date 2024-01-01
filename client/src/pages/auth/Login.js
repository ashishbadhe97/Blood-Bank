import React from "react";
import Form from "../../components/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

export const LoginPage = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      <div className="authPage-container">
        <div className="banner-container">
          <img src="/assets/images/banner1.jpeg" alt="blood bank banner 1" />
        </div>
        <Form formType={"Login"} buttonText={"Login"} />
        {loading && <Spinner />}
      </div>
    </>
  );
};
