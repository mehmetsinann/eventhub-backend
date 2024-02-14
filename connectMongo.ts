const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mehmetsinann:Sinan.4257@eventhubmongodb.3xf9vsb.mongodb.net/eventhubmongodb?retryWrites=true&w=majority"
    );
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect failed ", error);
  }
};

module.exports = connectDB;
