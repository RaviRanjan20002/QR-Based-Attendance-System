
// const express = require("express");
// const mongoose = require("mongoose");
// const Attendance = require("../models/Attendance");
// const Student = require("../models/Student");

// const router = express.Router();

// // ✅ Mark Attendance
// router.post("/mark", async (req, res) => {
//     try {
//         const { studentId } = req.body;
//         console.log("Received studentId:", studentId); // ✅ Debugging log

//         if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
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
//         await Attendance.create({ studentId, date: new Date() });

//         res.json({ message: "✅ Attendance marked successfully!" });
//     } catch (error) {
//         console.error("Error in /mark:", error);
//         res.status(500).json({ message: "❌ Server Error. Try again later." });
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

