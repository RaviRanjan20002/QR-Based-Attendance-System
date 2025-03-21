
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    batch: { type: String, required: true },
    contact: { type: String, required: true, unique: true }, // Keep contact unique if required
    fatherName: { type: String, required: true },
    qrCode: { type: String }, // QR Code stored as Base64
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
