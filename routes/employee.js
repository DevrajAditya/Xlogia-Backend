const router = require("express").Router();
const Employee = require("../models/Employee");

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findOne({ Id: employeeId });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employee" });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const lastEmployee = await Employee.findOne().sort({ Id: -1 });
    const newId = lastEmployee ? lastEmployee.Id + 1 : 1;
    const employee = new Employee({ ...req.body, Id: newId });
    const newEmployee = await employee.save();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
});

router.put("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ Id: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    Object.assign(employee, req.body);
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findOneAndRemove({ Id: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

module.exports = router;
