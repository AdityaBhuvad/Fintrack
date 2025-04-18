const mongoose = require("mongoose");

const connect_to_db = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_URL)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connect_to_db;