import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout/Layout";
import Sidebar from "../components/Layout/Sidebar";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axiosInstance from "../services/axiosService";
import { toast } from "react-toastify";
import moment from "moment";
import CustomInput from "../components/CustomInput";

const HomePage = () => {
  const { loading, user } = useSelector((state) => state.auth);

  const [inventoryData, setInventoryData] = useState([]);

  const selectRef = useRef();

  const getInventoryRecord = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_BASEURL}/inventory/get-inventories`
      );
      console.log("daata", data);
      if (data.success) {
        setInventoryData(data?.inventories);
      }
    } catch (err) {
      console.log("Error while getting inventory");
    }
  }

  useEffect(() => {
    getInventoryRecord();
    console.log("ineb", inventoryData);
  }, []);

  const [modalFormData, setModalFormData] = useState({
    inventoryType: "in",
    bloodGroup: "",
    donorEmail: "",
    quantity: "",
  });

  const modalFormHandler = (fieldName) => (e) => {
    return setModalFormData((prevState) => {
      return { ...prevState, [fieldName]: e.target.value };
    });
  };

  // const calculateBloodQuantity = async () => {
  //   try{

  //     const updatedInventory = inventoryData.map((invent,index) => {
  //       if(invent.bloodGroup === modalFormData.bloodGroup){
  //         if(invent.quantity >= modalFormData.quantity){
  //           axiosInstance.
  //         }
  //       }
  //     })
  //   }catch(err){
  //     console.log("Error while calculating blood quantity", err)
  //   }
  // }

  const modalFormSubmit = async (e) => {
    e.preventDefault();

    if (!modalFormData["bloodGroup"] || !modalFormData["quantity"]) {
      return alert("Please enter all fields");
    }

    if(user?.role !== "hospital" && modalFormData.inventoryType === "out"){
      return toast.error("Please login from hospital account");
    }

    try {
      const { data } = await axiosInstance.post(
        `${process.env.REACT_APP_BASEURL}/inventory/create-inventory`,
        {
          inventoryType: modalFormData.inventoryType,
          bloodGroup: modalFormData.bloodGroup,
          donorEmail: user?.email,
          quantity: modalFormData.quantity,
          organisation: user?._id,
          donor: user?._id,
          hospital: user?._id
        }
      );
      if (data.success) {
        toast.success("Record created successfully!");
      } else {
        toast.error("Failed to create record!");
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }

    selectRef.current.value = "";
    setModalFormData({
      inventoryType: "in",
      bloodGroup: "",
      donorEmail: "",
      quantity: ""
    });
  };

  return (
    <>
      <Layout>
        <div className="homepage-container">
          <Sidebar />
          <div className="homepage-body-container">
            <div
              className="homepage-header"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <BsFillPlusCircleFill />
              ADD Inventory
            </div>
            <div className="main-page-table">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr. No</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donor Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inventory, index) => {
                    return (
                      <tr key={inventory._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{inventory.bloodGroup}</td>
                        <td>{inventory.inventoryType?.toUpperCase()}</td>
                        <td>{inventory.quantity}</td>
                        <td>{inventory.donor?.email}</td>
                        <td>
                          {moment(inventory.createdAt).format(
                            "DD/MM/YYYY, h:mm a"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Manage Blood Record
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="modal-form">
                        <div className="radio-container">
                          <div className="radiofield-name">
                            <span>Inventory Type :</span> &nbsp;
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked={modalFormData.inventoryType === "in"}
                              value={"in"}
                              onChange={modalFormHandler("inventoryType")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              IN
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked={modalFormData.inventoryType === "out"}
                              value={"out"}
                              onChange={modalFormHandler("inventoryType")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              OUT
                            </label>
                          </div>
                        </div>
                        <div className="select-container">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Blood Group
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={modalFormHandler("bloodGroup")}
                            ref={selectRef}
                          >
                            <option value={""}>Open this select menu</option>
                            <option value={"O+"}>O+</option>
                            <option value={"O-"}>O-</option>
                            <option value={"AB+"}>AB+</option>
                            <option value={"AB-"}>AB-</option>
                            <option value={"A+"}>A+</option>
                            <option value={"A-"}>A-</option>
                            <option value={"B+"}>B+</option>
                            <option value={"B-"}>B-</option>
                          </select>
                        </div>

                        <div className="inputfield-container">
                          <CustomInput
                            label={modalFormData.inventoryType === "in" ? "Donor Email" : "Hospital Email"}
                            inputType={"email"}
                            onChange={modalFormHandler("donorEmail")}
                            value={modalFormData.donorEmail}
                          />
                        </div>
                        <div className="inputfield-container">
                          <CustomInput
                            label={"Quantity (ML)"}
                            inputType={"text"}
                            onChange={modalFormHandler("quantity")}
                            value={modalFormData.quantity}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        // data-bs-dismiss="modal"
                        onClick={modalFormSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && <Spinner />}
      </Layout>
    </>
  );
};

export default HomePage;
