import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Successfully Connection");
    })
    .catch((error) => {
      console.log("failed to Connect");
      console.log(error);
      process.exit(1);
    });
};

export default connect;