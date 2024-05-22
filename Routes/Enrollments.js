const express = require("express");
const app = express.Router();
const Enrollment = require("../Controller/Enrollments");

app.post("/enrollment",Enrollment.CreateEnrollments);
app.get("/getenrollment",Enrollment.getAllEnrollments);
app.put("/updateenrollment/:id",Enrollment.UpdateEnrollment);



module.exports = app;
 