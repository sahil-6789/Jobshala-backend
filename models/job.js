let mongoose = require("mongoose");
//SCHEMA SETUP
let jobSchema = new mongoose.Schema({
  title: {
    //recruiter name
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  category: {
    type: String,
    enum: [
      "OTHERS",
      "ELECTRICIAN",
      "PLUMBER",
      "LABOUR",
      "DRIVER",
      "MAID",
      "SECURITY GUARD",
      "COOK",
      "PEON",
      "MECHANIC",
    ],
    default: "OTHERS",
  },
  location: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  description: String,
  offeredSalary: Number,
  numberOfPositions: {
    type: Number,
    default: 1,
  },
  recruiterEmailId: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  recruiterPhoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 10,
    validate: /^\d{10}$/,
    required: true,
  },
  // author: {
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   username: String,
  // },
});

module.exports = mongoose.model("Job", jobSchema);
// First parameter is the Job and is the name of collection

// Model is used to check schema inside mongoDB i.e; which filed to choose and which not
// For example like there are 3 field in mongoDB Schema and We are trying to pull 5 fields then model will control and give us 3 field only
