const express = require('express');
const Student = require('../models/Student');
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Register student and generate QR code
router.post('/register', async (req, res) => {
    const { name, email } = req.body;
    const student = new Student({ name, email });

    // Generate QR code based on student ID
    const qrCodePath = `./qr_codes/${student._id}.png`;
    const qrImage = qr.image(student._id.toString(), { type: 'png' });
    qrImage.pipe(fs.createWriteStream(qrCodePath));

    student.qrCode = qrCodePath;
    await student.save();

    res.json({ student });
});

// Fetch all students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

module.exports = router;
