const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const studentSchema = new Schema(
  {
    username: {
      unique: true;
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+.\w{2,3}+/,"Invalid Email Address"],
     },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Student = model('student', studentSchema);

module.exports = Student;
