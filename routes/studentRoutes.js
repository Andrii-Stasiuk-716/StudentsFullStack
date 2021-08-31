const express = require('express');
const StudentController = require('../controllers/StudentController');

const router = express.Router();

router
  .route('/')
  .get(StudentController.getAllStudents).post(StudentController.createStudent);

router.route('/fields').get(StudentController.getNationalities);

module.exports = router;
