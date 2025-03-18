<<<<<<< HEAD

// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     qrCode: String, // QR Code image path or base64
// }, { timestamps: true }); // Adds 'createdAt' and 'updatedAt' fields

// module.exports = mongoose.model('Student', studentSchema);
=======
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true, trim: true },
//         qrCode: { type: String, default: null }, // ✅ Default null if QR not provided
//         batch: { type: String, required: true, trim: true }, // ✅ Ensure batch is required & trimmed
//         fatherName: { type: String, required: true, trim: true }, // ✅ Required to avoid empty data
//         contact: { 
//             type: String, 
//             required: true, 
//             unique: true, 
//             match: [/^\d{10}$/, "Invalid contact number"], // ✅ Ensures a valid 10-digit contact number
//         }, 
//     },
//     { timestamps: true } 
// );

// module.exports = mongoose.model("Student", studentSchema);
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     batch: { type: String, required: true },
//     contact: { type: String, unique: true, required: true },
//     fatherName: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     qrCode: { type: String }, // QR Code stored as Base64
// }, { timestamps: true });

// module.exports = mongoose.model("Student", studentSchema);
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     batch: { type: String, required: true },
//     contact: { type: String, unique: true, required: true },
//     fatherName: { type: String, required: true },
//     qrCode: { type: String }, // QR Code stored as Base64
// }, { timestamps: true });

// module.exports = mongoose.model("Student", studentSchema);


const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    batch: { type: String, required: true },
    contact: { type: String, required: true, unique: true }, // Keep contact unique if required
    fatherName: { type: String, required: true },
    qrCode: { type: String }, // QR Code stored as Base64
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
>>>>>>> 2e24c08c08ce1b72e8c36e703836c0c11e47581c
