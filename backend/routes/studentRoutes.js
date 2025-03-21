
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



