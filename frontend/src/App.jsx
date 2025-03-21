import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../src/components/Section/Layout';
import GenerateQRCode from "../src/components/Pages/GenerateQRCode";
import ScanQRCode from '../src/components/Pages/ScanQRCode';
import AttendanceDashboard from '../src/components/Pages/AttendanceDashboard';
import StudentAttendanceHistory from './components/Pages/StudentAttendanceHistory';
import TotalRegisterdStudent from './components/Pages/TotalRegisterdStudent';
import DateHistory from './components/Pages/DateHistory';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Layout wraps all routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<GenerateQRCode />} /> {/* Default page */}
                    <Route path="scan" element={<ScanQRCode />} />
                    <Route path="attendance" element={<AttendanceDashboard />} />
                    <Route path="attendancehistory" element={<StudentAttendanceHistory/>} />
                    <Route path="registeredstudent" element={<TotalRegisterdStudent/>} />
                    <Route path="datehistory" element={<DateHistory/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

