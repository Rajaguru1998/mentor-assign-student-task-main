const mongoose = require("mongoose");

 studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
});

module.exports = mongoose.model("Student", studentSchema);