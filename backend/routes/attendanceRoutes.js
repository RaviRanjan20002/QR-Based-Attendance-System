// const express = require('express');
// const Attendance = require('../models/Attendance');

// const router = express.Router();

// // Mark attendance
// router.post('/mark', async (req, res) => {
//     const { studentId } = req.body;

//     // Check if attendance is already marked
//     const existingAttendance = await Attendance.findOne({
//         studentId,
//         date: { $gte: new Date().setHours(0, 0, 0, 0) },
//     });

//     if (existingAttendance) {
//         return res.status(400).json({ message: 'Attendance already marked' });
//     }

//     const attendance = new Attendance({ studentId });
//     await attendance.save();
//     res.json({ message: 'Attendance marked successfully' });
// });

// // Get attendance records
// router.get('/', async (req, res) => {
//     const attendanceRecords = await Attendance.find().populate('studentId');
//     res.json(attendanceRecords);
// });

// module.exports = router;
// const express = require('express');
// const Attendance = require('../models/Attendance');
// const Student = require('../models/Student');

// const router = express.Router();

// // ✅ Mark attendance
// router.post('/mark', async (req, res) => {
//     try {
//         const { studentId } = req.body;

//         // Check if attendance is already marked for today
//         const existingAttendance = await Attendance.findOne({
//             studentId,
//             date: { $gte: new Date().setHours(0, 0, 0, 0) },
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ message: 'Attendance already marked' });
//         }

//         const attendance = new Attendance({ studentId });
//         await attendance.save();
//         res.json({ message: 'Attendance marked successfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // ✅ Get all attendance records (Sorted by latest date)
// router.get('/', async (req, res) => {
//     try {
//         const attendanceRecords = await Attendance.find()
//             .populate('studentId', 'name email')
//             .sort({ date: -1 });

//         res.json(attendanceRecords);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // ✅ Get attendance history of a specific student
// router.get('/history/:studentId', async (req, res) => {
//     try {
//         const { studentId } = req.params;

//         const attendanceHistory = await Attendance.find({ studentId })
//             .sort({ date: -1 });

//         res.json(attendanceHistory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // ✅ Get daily attendance report
// router.get('/report/daily', async (req, res) => {
//     try {
//         const today = new Date().setHours(0, 0, 0, 0);

//         const dailyAttendance = await Attendance.find({ date: { $gte: today } })
//             .populate('studentId', 'name email');

//         res.json(dailyAttendance);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// module.exports = router;

// const express = require('express');
// const Attendance = require('../models/Attendance');
// const Student = require('../models/Student');

// const router = express.Router();

// // ✅ Mark attendance
// router.post('/mark', async (req, res) => {
//     try {
//         const { studentId } = req.body;

//         // Check if attendance is already marked for today
//         const existingAttendance = await Attendance.findOne({
//             studentId,
//             date: { $gte: new Date().setHours(0, 0, 0, 0) },
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ message: 'Attendance already marked' });
//         }

//         const attendance = new Attendance({ studentId });
//         await attendance.save();
//         res.json({ message: 'Attendance marked successfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // ✅ Get all attendance records (Sorted by latest date)
// router.get('/', async (req, res) => {
//     try {
//         const attendanceRecords = await Attendance.find()
//             .populate('studentId', 'name email')
//             .sort({ date: -1 });

//         res.json(attendanceRecords);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // // ✅ Get attendance history of a specific student (with student details)
// // router.get('/history/:studentId', async (req, res) => {
// //     try {
// //         const { studentId } = req.params;

// //         const attendanceHistory = await Attendance.find({ studentId })
// //             .populate('studentId', 'name email') // Added population
// //             .sort({ date: -1 });

// //         res.json(attendanceHistory);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Server Error' });
// //     }
// // });

// // // ✅ Get daily attendance report (with optional student filtering)
// // router.get('/report/daily', async (req, res) => {
// //     try {
// //         const today = new Date().setHours(0, 0, 0, 0);
// //         const { studentId } = req.query;

// //         let filter = { date: { $gte: today } };
// //         if (studentId) {
// //             filter.studentId = studentId;
// //         }

// //         const dailyAttendance = await Attendance.find(filter)
// //             .populate('studentId', 'name email');

// //         res.json(dailyAttendance);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Server Error' });
// //     }
// // });

// module.exports = router;
// const express = require("express");
// const mongoose = require("mongoose");
// const Attendance = require("../models/Attendance");
// const Student = require("../models/Student");

// const router = express.Router();

// // ✅ Mark Attendance
// router.post("/mark", async (req, res) => {
//     try {
//         const { studentId } = req.body;

//         if (!studentId) {
//             return res.status(400).json({ message: "Invalid Student ID" });
//         }

//         // ✅ Check if Student Exists
//         const studentExists = await Student.findById(studentId);
//         if (!studentExists) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         // ✅ Check if attendance is already marked for today
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const existingAttendance = await Attendance.findOne({
//             studentId,
//             date: { $gte: today },
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ message: "Attendance already marked" });
//         }

//         // ✅ Mark Attendance
//         const attendance = new Attendance({ studentId, date: new Date() });
//         await attendance.save();
//         res.json({ message: "Attendance marked successfully" });

//     } catch (error) {
//         console.error("Error in /mark:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // ✅ Get all attendance records (Sorted by latest date)
// router.get("/", async (req, res) => {
//     try {
//         const attendanceRecords = await Attendance.find()
//             .populate("studentId", "name email")
//             .sort({ date: -1 });

//         res.json(attendanceRecords);
//     } catch (error) {
//         console.error("Error in /:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

const router = express.Router();

// ✅ Mark Attendance
router.post("/mark", async (req, res) => {
    try {
        const { studentId } = req.body;
        console.log("Received studentId:", studentId); // ✅ Debugging log

        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: "Invalid Student ID" });
        }

        // ✅ Check if Student Exists
        const studentExists = await Student.findById(studentId);
        if (!studentExists) {
            return res.status(404).json({ message: "Student not found" });
        }

        // ✅ Check if attendance is already marked for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            studentId,
            date: { $gte: today },
        });

        if (existingAttendance) {
            return res.status(400).json({ message: "Attendance already marked" });
        }

        // ✅ Mark Attendance
        await Attendance.create({ studentId, date: new Date() });

        res.json({ message: "✅ Attendance marked successfully!" });
    } catch (error) {
        console.error("Error in /mark:", error);
        res.status(500).json({ message: "❌ Server Error. Try again later." });
    }
});

// ✅ Get all attendance records (Sorted by latest date)
router.get("/", async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find()
            .populate("studentId", "name email")
            .sort({ date: -1 });

        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error in /:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

