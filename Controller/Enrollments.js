const Enrollments = require('../Model/model').Student_Course;

const CreateEnrollments =async(req,res)=>{
    try {
        const newEnrollment = new Enrollments(req.body);
        const enrollment = await newEnrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllEnrollments=async(req,res)=>{
    try {
        const enrollments = await Enrollments.find().populate('studentId courseId');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getEnrollmentforstudent =async(req,res)=>{
    try {
        const enrollments = await Enrollments.find({ studentId: req.params.studentId }).populate('courseId');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getEnrollmentforcourse=async(req,res)=>{
    try {
        const enrollments = await Enrollments.find({ courseId: req.params.courseId }).populate('studentId');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const UpdateEnrollment=async(req,res)=>{
    try {
        const {inTraining} = req.body
        const enrollment = await Enrollments.findByIdAndUpdate(
            req.params.id,
            { inTraining: inTraining },
            { new: true }
        );
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.json(enrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const DeleteEnrollment=async(req,res)=>{
    try {
        const enrollment = await Enrollments.findByIdAndDelete(req.params.id);
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.json({ message: 'Unenrolled from course' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports={
    CreateEnrollments:CreateEnrollments,
    getAllEnrollments:getAllEnrollments,
    getEnrollmentforstudent:getEnrollmentforstudent,
    getEnrollmentforcourse:getEnrollmentforcourse,
    UpdateEnrollment:UpdateEnrollment,
    DeleteEnrollment:DeleteEnrollment
}