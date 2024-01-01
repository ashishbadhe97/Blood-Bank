import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUserAction } from "../redux/actions/authActions";
import axiosInstance from "../services/axiosService";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  console.log("ashish");

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/current-user");
      if (data.success) {
        dispatch(getCurrentUserAction(data));
      }
      return data;
    } catch (err) {
      localStorage.clear();
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      console.log("Inside useEffect");
      const data = await getUser();
      if (!data?.success) {
        navigate("/login");
      }
    })();
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Spinner />;
  }
  console.log("Reached children before");
  return children;
};

export default PrivateRoute;
