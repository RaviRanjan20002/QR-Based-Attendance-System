<<<<<<< HEAD

// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//     studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
//     date: { type: Date, default: Date.now },
//     status: { type: String, default: 'Present' }  // Added status field
// });

// module.exports = mongoose.model('Attendance', attendanceSchema);
=======

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Present' }  // Added status field
});

module.exports = mongoose.model('Attendance', attendanceSchema);
>>>>>>> 2e24c08c08ce1b72e8c36e703836c0c11e47581c
