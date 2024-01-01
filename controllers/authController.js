const User = require("../model/user");
const bcrypt = require("bcryptjs");
const {
  maskPassword,
  generateAuthToken,
  userResponseData,
} = require("../utils/authService");

const registerController = async (req, res) => {
  try {
    const { password, email, name, hospitalName, organisationName, address, phone, role } = req.body;

    if(!role){
      throw new Error("Please select role")
    }


    if((role === "admin" || role === "donor") && !name){
      throw new Error("Invalid name")
    }
    if((role === "organisation") && !organisationName){
      throw new Error("Invalid organisation name")
    }
    if((role === "hospital ") && !hospitalName){
      throw new Error("Invalid hospital name")
    }
    if(!email){
      throw new Error("Invalid email")
    }
    if(!password){
      throw new Error("Invalid password")
    }
    if(!address){
      throw new Error("Invalid address")
    }
    if(!phone){
      throw new Error("Invalid phone")
    }

    req.body.password =
      password?.length >= 5 ? await maskPassword(password) : "";

    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      throw new Error("Email already exists!");
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully!",
      user: userResponseData(user),
    });
  } catch (error) {
    console.log("Error in register Api", error.message);
    res.status(500).send({
      success: false,
      message: "Error in register Api",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      throw new Error("Invalid email");
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      throw new Error("Invalid password");
    }

    if (user.role !== role) {
      throw new Error("Please check role");
    }

    const token = generateAuthToken(user._id);

    res.status(200).send({
      success: true,
      message: "User logged successfully!",
      user: userResponseData(user),
      token,
    });
  } catch (error) {
    console.log("Error in login Api ", error.message);
    res.status(500).send({
      success: false,
      message: "Error in login Api",
      error: error.message,
    });
  }
};

const getCurrentUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
      token: req.token
    });
  } catch (error) {
    console.log("Error in getCurrentUser Api ", error.message);
    res.status(500).send({
      success: false,
      message: "Error in getCurrentUser Api",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getCurrentUserController
};
