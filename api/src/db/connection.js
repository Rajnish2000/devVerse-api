import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const db_url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log(db_url);
    let connectionInstance = await mongoose.connect(db_url);
    console.log(
      `👍⛑👋 mongodb connected successfully ${connectionInstance.connection.host}✔❤`
    );
  } catch (err) {
    console.log(err);
  }
};

export { connectDB };
