const mongoose = require('mongoose');
const slugify = require('slugify');

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'A student must have an id'],
    },
    firstName: {
      type: String,
      required: [true, 'A Student must have a firstname'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'A Student must have a lastname'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'A Student must have a age'],
    },
    nationality: {
      type: String,
      required: [true, 'Title must have a nationality'],
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
studentSchema.index({ id: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
studentSchema.pre('save', function (next) {
  this.slug = slugify(this.firstName, { lower: true });
  next();
});

module.exports = mongoose.model('Student', studentSchema);
