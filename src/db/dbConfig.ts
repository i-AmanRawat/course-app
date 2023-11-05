import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!, { dbName: "courses" });

    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("Mongodb connected successfully!");
    });

    connection.on("error", (error) => {
      console.log(
        "Mongodb connection error. Make sure Mongodb is running",
        error
      );

      process.exit();
    });

    // process.exit();
  } catch (error: any) {
    console.log(error.message);
  }
}
