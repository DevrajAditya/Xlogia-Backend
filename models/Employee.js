const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Id: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  Email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format",
    },
  },
  Age: { type: Number, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
