const mongoose = require("mongoose");

//data models for Mentor and Student using Mongoose.
 mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Mentor", mentorSchema);