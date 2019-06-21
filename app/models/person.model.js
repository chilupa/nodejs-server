const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema(
  {
    name: String,
    age: String,
    gender: String,
    mobileNumber: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Person", PersonSchema);
