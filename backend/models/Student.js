// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     qrCode: String, // QR Code image path or base64
// });

// module.exports = mongoose.model('Student', studentSchema);
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    qrCode: String, // QR Code image path or base64
}, { timestamps: true }); // Adds 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('Student', studentSchema);
