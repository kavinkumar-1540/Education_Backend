const express = require("express");
const app = express.Router();
const Course = require("../Controller/Course");

app.post("/courses",Course.createCourse);
app.get("/getcourses",Course.getAllCourse);
app.get("/getcourses/:id",Course.getCourseById);



module.exports = app;
 