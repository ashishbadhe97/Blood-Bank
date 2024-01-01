const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully".bgMagenta.white)
    }catch(error){
        console.log("Database connection failed".bgRed.white);
        throw new Error(`Database connection failed: ${error.message}`)
    }
}

module.exports = connectDB;