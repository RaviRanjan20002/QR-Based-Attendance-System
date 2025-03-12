import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from '../src/components/Section/Layout';
import GenerateQRCode from "../src/components/Pages/GenerateQRCode";
import ScanQRCode from '../src/components/Pages/ScanQRCode';
import AttendanceDashboard from '../src/components/Pages/AttendanceDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                <Route path="/" element={<GenerateQRCode />} />
                <Route path="/scan" element={<ScanQRCode/>} />
                <Route path="/attendance" element={<AttendanceDashboard />} /> 
                </Route>   
            </Routes>
        </Router>
    );
};

export default App;


