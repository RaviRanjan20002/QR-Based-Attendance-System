// const express = require('express');
// const Student = require('../models/Student');
// const qr = require('qr-image');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// // Register student and generate QR code
// router.post('/register', async (req, res) => {
//     const { name, email } = req.body;
//     const student = new Student({ name, email });

//     // Generate QR code based on student ID
//     const qrCodePath = `./qr_codes/${student._id}.png`;
//     const qrImage = qr.image(student._id.toString(), { type: 'png' });
//     qrImage.pipe(fs.createWriteStream(qrCodePath));

//     student.qrCode = qrCodePath;
//     await student.save();

//     res.json({ student });
// });

// // Fetch all students
// router.get('/', async (req, res) => {
//     const students = await Student.find();
//     res.json(students);
// });

// module.exports = router;
const express = require('express');
const Student = require('../models/Student');
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = new Student({ name, email });

        await student.save(); // ✅ Save the student first to get the ID

        // ✅ Generate QR Code with Student ID (not file path)
        const qrCodePath = `${student._id}.png`;
        const qrImage = qr.image(student._id.toString(), { type: 'png' }); // ✅ Fix: Use student ID
        qrImage.pipe(fs.createWriteStream(qrCodePath));

        student.qrCode = qrCodePath;
        await student.save();

        res.json({ student, qrCodeData: student._id.toString() }); // ✅ Return student ID for frontend
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Fetch all registered students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
