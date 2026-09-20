const Student = require('../Models/studModel');

// POST /students/addStudent
async function create(req, res) {
  try {
    const { name, email, age, grade, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required.' });
    }

    const student = await Student.create({ name, email, age, grade, phone });
    return res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A student with this email already exists.' });
    }
    console.error('create student error:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { create };
