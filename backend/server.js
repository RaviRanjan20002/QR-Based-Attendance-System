require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1); // Exit process if DB connection fails
    }
};

connectDB();

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// >> 
//   TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       25512
//   TCP    [::]:5000              [::]:0                 LISTENING       25512
// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// taskkill /PID 23996 /F

// SUCCESS: The process with PID 25512 has been terminated.
// PS D:\TestPlatform\backend> npm start