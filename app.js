//ExpressJS Requirments
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({extended: true,limit: "10mb",parameterLimit: 50000,}));


const config = require("./config/serverConfig");
const port = process.env.PORT || 8083;



mongoose
.connect(config.dbURL)
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);


const course = require("./Routes/Course")
const student = require("./Routes/Student")
const enrollment = require("./Routes/Enrollments")
app.use(course)
app.use(student)
app.use(enrollment)



//Middleware for health check
app.use("/api/health", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});



app.listen(port, () => {
  console.log("Server is running on http://localhost: " + port);
});



