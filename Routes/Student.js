const express = require("express");
const app = express.Router();
const Student = require("../Controller/Student");

app.post("/student",Student.createStudent);
app.get("/getstudent",Student.getAllStudents);



module.exports = app;
 