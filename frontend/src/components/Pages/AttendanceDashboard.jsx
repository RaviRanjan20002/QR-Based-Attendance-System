// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AttendanceDashboard = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/attendance')
//             .then(response => setAttendanceRecords(response.data))
//             .catch(error => console.error("Error fetching attendance records:", error));
//     }, []);

//     return (
//         <div>
//             <h2>Attendance Records</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Email</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {attendanceRecords.map((record) => (
//                         <tr key={record._id}>
//                             <td>{record.studentId?.name || "Unknown"}</td>
//                             <td>{record.studentId?.email || "Unknown"}</td>
//                             <td>{new Date(record.date).toLocaleDateString()}</td>
//                             <td>{record.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AttendanceDashboard;

// import React, { useEffect, useState } from 'react'; 
// import axios from 'axios';

// const AttendanceDashboard = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/attendance')
//             .then(response => {
//                 const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//                 const filteredRecords = response.data.filter(record => 
//                     new Date(record.date).toISOString().split('T')[0] === today
//                 );
//                 setAttendanceRecords(filteredRecords);
//             })
//             .catch(error => console.error("Error fetching attendance records:", error));
//     }, []);

//     return (
//         <div>
//             <h2>Today's Attendance Records</h2>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Email</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {attendanceRecords.map((record) => (
//                         <tr key={record._id}>
//                             <td>{record.studentId?.name || "Unknown"}</td>
//                             <td>{record.studentId?.email || "Unknown"}</td>
//                             <td>{new Date(record.date).toLocaleDateString()}</td>
//                             <td>{record.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AttendanceDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../Styles/AttendanceDashboard.css"; // Import CSS for styling

const AttendanceDashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        // Fetch all students
        // ('http://localhost:5000/api/students')
        axios.get('https://attendance-tracker-3t8w.onrender.com/api/students')
            .then(response => setAllStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));

        // Fetch today's attendance records
        axios.get('https://attendance-tracker-3t8w.onrender.com/api/attendance')
            .then(response => {
                const todayRecords = response.data.filter(record =>
                    new Date(record.date).toISOString().split('T')[0] === today
                );
                setAttendanceRecords(todayRecords);
            })
            .catch(error => console.error("Error fetching attendance records:", error));
    }, []);

    useEffect(() => {
        if (allStudents.length > 0) {
            // Get the list of students who were marked present today
            const presentStudentIds = new Set(attendanceRecords.map(record => record.studentId?._id));

            // Identify absent students (those not in today's attendance records)
            const absentList = allStudents.filter(student => !presentStudentIds.has(student._id));
            setAbsentStudents(absentList);
        }
    }, [attendanceRecords, allStudents]);

    return (
        <div className="attendance-container">
            {/* Present Students Section */}
            <div className="attendance-section present">
                <h2>✅ Today's Present Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.studentId?.name || "Unknown"}</td>
                                    <td>{record.studentId?.email || "Unknown"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No students present today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Absent Students Section */}
            <div className="attendance-section absent">
                <h2>❌ Today's Absent Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absentStudents.length > 0 ? (
                            absentStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No students absent today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceDashboard;

