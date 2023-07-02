import mongoose from "mongoose";

export async function connect() {
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL!);
    // Get Mongoose to use the global promise library
    const connection = mongoose.connection;
    // When successfully connected
    connection.on("connected", () => {
      console.log("DB connected Successfully");
    });
    // If the connection throws an error
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please Make sure MongoDB is running",
        err
      );
      // Exit process with failure
      process.exit();
    });
  } catch (error) {
    //log error message if any exception occurs
    console.log("Something goes wrong", error);
  }
}
