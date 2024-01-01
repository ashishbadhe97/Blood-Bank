import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  console.log("public ");

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default PublicRoute;
