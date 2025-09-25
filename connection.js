import mongoose from "mongoose";
const connectDB = async (dbUrl) => {
    try {
        await mongoose.connect(dbUrl);
        console.log('mongoDB connection success')
    } catch (error) {
        console.log("mongoDB connection fail");
        process.exit(1);
    }
}

export default connectDB;