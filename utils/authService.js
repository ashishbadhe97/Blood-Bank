const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maskPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to hash password");
  }
};

const generateAuthToken = (id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
    if (!token) {
      throw new Error();
    }
    return token;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to generate auth token");
  }
};

const userResponseData = (user) => {
  try {
    if (!user && !user.password) {
      throw new Error();
    }
    
    const userResponseObject = user.toObject();
    delete userResponseObject.password;
    return userResponseObject;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to create userResponse Object");
  }
};

module.exports = {
  maskPassword,
  generateAuthToken,
  userResponseData,
};
