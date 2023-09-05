import mongoose from "mongoose";
const Connection = (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@translator.eap8jig.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.connect(URL, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("Database has connected successfully.");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Error while connecting to the database", error.message);
  });
};

export default Connection;
