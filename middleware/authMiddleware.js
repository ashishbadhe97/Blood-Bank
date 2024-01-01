const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { userResponseData } = require("../utils/authService");

const userAuthenticationMiddlerware = async (req, res, next) => {
    try{
        const token = req.headers["authorization"]?.replace("Bearer ","");
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await User.findById({ _id: decode.userId}).exec();
        if(!user){
            throw new Error("User is unauthenticated")
        }

        req.user = userResponseData(user);
        req.token = token;
        next();
    }catch(error){
        console.log("Error while authenticating User ", error.message);
        res.status(401).send({
            success: false,
            message: "Access denied",
            error: "User is unauthenticated"
        })
    }
};

module.exports = {
    userAuthenticationMiddlerware
}