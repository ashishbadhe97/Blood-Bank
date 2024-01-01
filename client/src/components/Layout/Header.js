import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillDropletFill, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { role, name },
  } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-appname-container">
            <span className="icon-container">
              <BsFillDropletFill />
            </span>
            <span>Blood Bank App</span>
          </div>
          <div className="nav-info-container">
            <div className="nav-user-info">
              <BsFillPersonFill />
              <span>
                Welcome {name} ({role})
              </span>
            </div>
            <div className="nav-logout-button">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
