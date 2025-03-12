import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceDashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/attendance')
            .then(response => setAttendanceRecords(response.data))
            .catch(error => console.error("Error fetching attendance records:", error));
    }, []);

    return (
        <div>
            <h2>Attendance Records</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record.studentId?.name || "Unknown"}</td>
                            <td>{record.studentId?.email || "Unknown"}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceDashboard;
