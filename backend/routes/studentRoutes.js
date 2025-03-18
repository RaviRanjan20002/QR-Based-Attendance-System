<<<<<<< HEAD

// const express = require('express');
// const Student = require('../models/Student');
// const qr = require('qr-image');
// const fs = require('fs');
// const path = require('path');
=======
// // const express = require("express");
// // const Student = require("../models/Student");
// // const qr = require("qr-image");
// // const { Readable } = require("stream");
>>>>>>> 2e24c08c08ce1b72e8c36e703836c0c11e47581c

// // const router = express.Router();

// // // ✅ Register student & generate QR code
// // router.post("/register", async (req, res) => {
// //     try {
// //         const { name, studentId, batch, contact, fatherName } = req.body;

// //         console.log("Received Data:", req.body); // ✅ Debugging Log

// //         // ✅ Validate required fields
// //         if (!name || !batch || !contact || !fatherName) {
// //             return res.status(400).json({ message: "All fields are required." });
// //         }

// //         // ✅ Check if contact or studentId already exists
// //         const existingStudent = await Student.findOne({ $or: [{ contact }, { studentId }] });
// //         if (existingStudent) {
// //             return res.status(400).json({ message: "Contact or Student ID already exists." });
// //         }

// //         // ✅ Create new student
// //         const student = new Student({ name, studentId, batch, contact, fatherName });
// //         await student.save(); // Save to get the ID

// //         // ✅ Generate QR Code (Base64)
// //         const qrImageStream = qr.imageSync(student.studentId, { type: "png" });
// //         const qrCodeBase64 = `data:image/png;base64,${qrImageStream.toString("base64")}`;

// //         // ✅ Save QR Code in DB
// //         student.qrCode = qrCodeBase64;
// //         await student.save();

// //         res.json({ student, qrCodeData: student.studentId }); // ✅ Return student data & QR info
// //     } catch (error) {
// //         console.error("Error registering student:", error);
// //         res.status(500).json({ message: "Server Error" });
// //     }
// // });

// // // ✅ Fetch all registered students
// // router.get("/", async (req, res) => {
// //     try {
// //         const students = await Student.find();
// //         res.json(students);
// //     } catch (error) {
// //         console.error("Error fetching students:", error);
// //         res.status(500).json({ message: "Server Error" });
// //     }
// // });

// // module.exports = router;
// const express = require("express");
// const Student = require("../models/Student");
// const router = express.Router();

<<<<<<< HEAD
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const student = new Student({ name, email });

//         await student.save(); // ✅ Save the student first to get the ID

//         // ✅ Generate QR Code with Student ID (not file path)
//         const qrCodePath = `${student._id}.png`;
//         const qrImage = qr.image(student._id.toString(), { type: 'png' }); // ✅ Fix: Use student ID
//         qrImage.pipe(fs.createWriteStream(qrCodePath));

//         student.qrCode = qrCodePath;
//         await student.save();

//         res.json({ student, qrCodeData: student._id.toString() }); // ✅ Return student ID for frontend
//     } catch (error) {
//         console.error("Error registering student:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // ✅ Fetch all registered students
// router.get("/", async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.json(students);
//     } catch (error) {
//         console.error("Error fetching students:", error);
=======
// // ✅ Register student
// router.post("/register", async (req, res) => {
//     try {
//         const { name, studentId, batch, contact, fatherName } = req.body;

//         console.log("📥 Received Data:", req.body); // ✅ Debugging Log

//         // ✅ Validate required fields
//         if (!name || !studentId || !batch || !contact || !fatherName) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // ✅ Check if studentId or contact already exists
//         const existingStudent = await Student.findOne({ $or: [{ studentId }, { contact }] });
//         if (existingStudent) {
//             return res.status(400).json({ message: "Student ID or Contact number already exists." });
//         }

//         // ✅ Create new student
//         const student = new Student({ name, studentId, batch, contact, fatherName });
//         await student.save(); // Save to get the ID

//         console.log("✅ Student registered:", student);
//         res.status(201).json({ student });

//     } catch (error) {
//         console.error("🚨 Registration Error:", error);
>>>>>>> 2e24c08c08ce1b72e8c36e703836c0c11e47581c
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;
<<<<<<< HEAD
=======



// const express = require("express");
// const Student = require("../models/Student");
// const qr = require("qr-image");

// const router = express.Router();

// // ✅ Register student & generate QR code
// router.post("/register", async (req, res) => {
//     try {
//         const { name, batch, contact, fatherName, email } = req.body;

//         console.log("📥 Received Data:", req.body); // Debugging log

//         // ✅ Validate required fields
//         if (!name || !batch || !contact || !fatherName || !email) {
//             return res.status(400).json({ message: "All fields are required." });
//         }

//         // ✅ Check if contact or email already exists
//         const existingStudent = await Student.findOne({ $or: [{ contact }, { email }] });
//         if (existingStudent) {
//             return res.status(400).json({ message: "Contact or Email already exists." });
//         }

//         // ✅ Create new student
//         const student = new Student({ name, batch, contact, fatherName, email });
//         await student.save();

//         // ✅ Generate QR Code (Base64)
//         const qrImageStream = qr.imageSync(student._id.toString(), { type: "png" });
//         const qrCodeBase64 = `data:image/png;base64,${qrImageStream.toString("base64")}`;

//         // ✅ Save QR Code in DB
//         student.qrCode = qrCodeBase64;
//         await student.save();

//         res.json({ student, qrCodeData: student._id.toString() }); // ✅ Return student data & QR info
//     } catch (error) {
//         console.error("🚨 Registration Error:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // ✅ Fetch all registered students
// router.get("/", async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.json(students);
//     } catch (error) {
//         console.error("🚨 Error fetching students:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;

const express = require("express");
const Student = require("../models/Student");
const qr = require("qr-image");

const router = express.Router();

// ✅ Register student & generate QR code
router.post("/register", async (req, res) => {
    try {
        const { name, batch, contact, fatherName } = req.body;

        if (!name || !batch || !contact || !fatherName) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // ✅ Check if contact already exists
        const existingStudent = await Student.findOne({ contact });
        if (existingStudent) {
            return res.status(400).json({ message: "Contact number already exists." });
        }

        // ✅ Create new student
        const student = new Student({ name, batch, contact, fatherName });
        await student.save();

        // ✅ Generate QR Code (Base64) using MongoDB `_id`
        const qrImageStream = qr.imageSync(student._id.toString(), { type: "png" });
        const qrCodeBase64 = `${qrImageStream.toString("base64")}`;

        // ✅ Save QR Code in DB
        student.qrCode = qrCodeBase64;
        await student.save();

        res.json({ student, qrCodeData: student._id.toString() }); // ✅ Use `_id`
    } catch (error) {
        console.error("🚨 Registration Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
// ✅ Fetch all registered students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("🚨 Error fetching students:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;



>>>>>>> 2e24c08c08ce1b72e8c36e703836c0c11e47581c
