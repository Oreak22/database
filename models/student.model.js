const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  first_name: { type: String, required: true, minLength: 3, maxLength: 20 },
  last_name: { type: String, required: true, minLength: 3, maxLength: 20 },
  email: { type: String, required: true, unique: true },
  student_id: { type: String, required: true, unique: true },
  active_status: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;
