const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Insert Student
router.post('/', async (req, res) => {
  const { firstName, lastName, rollNo, password, contactNumber } = req.body;
  try {
    const newStudent = new Student({ firstName, lastName, rollNo, password, contactNumber });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Student by Roll No
router.delete('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Student by Roll No
router.put('/:rollNo', async (req, res) => {
  const { contactNumber } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      { contactNumber },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View all Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
