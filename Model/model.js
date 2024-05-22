const mongoose = require("mongoose");
const enum_values=require('../Libs/constant');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    is_active: { type: Boolean, default: true,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_deleted: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  });
  
  courseSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });


  const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_deleted: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  });
  
  studentSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

  const studentCoursesSchema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    inTraining: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_active: { type: Boolean, default: true,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_deleted: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

studentCoursesSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

  module.exports = {
    Student: mongoose.model("Student", studentSchema),
    Courses: mongoose.model("Course", courseSchema),
    Student_Course: mongoose.model("Student_Course", studentCoursesSchema),
  };