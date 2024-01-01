import React from "react";
import { MdOutlineInventory } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";
import { RiHospitalFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <div className="menu-container">
        <div className="menulist-container">
          <div
            className={`menutitle-container ${
              location.pathname === "/inventory" ? "active" : ""
            }`}
          >
            <Link to="/inventory">
              <MdOutlineInventory />
              <span>Inventory</span>
            </Link>
          </div>
          <div
            className={`menutitle-container ${
              location.pathname === "/donor" ? "active" : ""
            }`}
          >
            <Link to="/donor">
              <FaHandHoldingMedical />
              <span>Donor</span>
            </Link>
          </div>
          <div
            className={`menutitle-container ${
              location.pathname === "/hospital" ? "active" : ""
            }`}
          >
            <Link to="/hospital">
              <RiHospitalFill />
              <span>Hospital</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
