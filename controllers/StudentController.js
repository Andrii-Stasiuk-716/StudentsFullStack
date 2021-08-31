const Student = require('../models/studentModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Actions
exports.getAllStudents = factory.getAll(Student);
exports.getStudent = factory.getOne(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);

exports.getNationalities = catchAsync(async (req, res, next) => {
  const property = req.query.property;
  const doc = await Student.find({}).select(`${property}`);

  if (!doc) {
    return next(new AppError('Cannot find Data', 404));
  }

  const fields = [...new Set(doc.map((item) => item[property]))];

  res.status(200).json({
    status: 'success',
    data: {
      fields,
    },
  });
});
