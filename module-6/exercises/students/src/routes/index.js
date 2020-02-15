const express = require('express');
const router = express.Router();

const students = require('./students');
const teachers = require('./teachers');
const classes = require('./classes');

router.get('/', (req, res) => {
  res.json({
    students: 'http://localhost:8080/v1/students',
    teachers: 'http://localhost:8080/v1/teachers',
    classes: 'http://localhost:8080/v1/classes'
  });
});

router.use('/students', students);
router.use('/teachers', teachers);
router.use('/classes', classes);

module.exports = router;
