import eventRouter from "./routes/eventRouter";

const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/techcareer-final")
  .then(() => {
    console.log("MongoDB bağlantısı başarılı");
  })
  .catch((err: any) => {
    console.log("MongoDB bağlantısı başarısız", err);
  });

app.use(express.json());

app.use("/eventhub/api", eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
