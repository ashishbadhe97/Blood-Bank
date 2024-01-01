import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { RegisterPage } from "./pages/auth/Register";
import { LoginPage } from "./pages/auth/Login";
import { PageNotFound } from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import PublicRoute from "./routes/PublicRoute";

function App() {
  console.log("In app");

  useEffect(() => {
    console.log("In use eee");
  }, []);
  
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
