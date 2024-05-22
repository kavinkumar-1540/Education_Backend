const Course = require("../Model/model").Courses;

const createCourse = async(req,res)=>{
    try {
        const newCourse = new Course(req.body);
        const course = await newCourse.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

const getAllCourse = async(req,res)=>{
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCourseById = async(req,res)=>{
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const UpdateCourse = async(req,res)=>{
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const DeleteCourse = async(req,res)=>{
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createCourse: createCourse,
    getAllCourse:getAllCourse,
    getCourseById:getCourseById,
    UpdateCourse:UpdateCourse,
    DeleteCourse:DeleteCourse
}