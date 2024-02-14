import eventRouter from "./src/routes/eventRouter";

const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const connectDB = require("./connectMongo");
// console.log(process.env.MONGO_URI);
connectDB();
const PORT = process.env.PORT;

app.use("/eventhub/api", eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running. Listening on port ${PORT}...`);
});
