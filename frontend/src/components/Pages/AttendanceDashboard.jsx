
// import axios from 'axios';
// import "../../Styles/AttendanceDashboard.css"; // Import CSS for styling
// import React, { useEffect, useState } from 'react';
// const AttendanceDashboard = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [allStudents, setAllStudents] = useState([]);
//     const [absentStudents, setAbsentStudents] = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
//             const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//             console.log(today);

//             try {
//                 // Fetch all students
//                 const studentsResponse = await axios.get('https://attendance-tracker-3t8w.onrender.com/api/students');
//                 setAllStudents(studentsResponse.data);
//                 // Fetch today's attendance records
//                 const attendanceResponse = await axios.get('https://attendance-tracker-3t8w.onrender.com/api/attendance');
//                 const todayRecords = attendanceResponse.data.filter(record =>
//                     new Date(record.date).toISOString().split('T')[0] === today
//                 );
//                 setAttendanceRecords(todayRecords);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);



//     useEffect(() => {
//         if (allStudents.length > 0) {
//             // ✅ Fix: Use studentId directly as it's now a direct reference (_id) in Attendance schema
//             const presentStudentIds = new Set(attendanceRecords.map(record => record.studentId));
//             console.log("attendanceRecords",attendanceRecords);
            
//             console.log("present",presentStudentIds);
            

//             // Identify absent students (those not in today's attendance records)
//             const absentList = allStudents.filter(student => !presentStudentIds.has(student._id));
//             setAbsentStudents(absentList);
//         }
//     }, [attendanceRecords, allStudents]);

//     return (
//         <div className="attendance-container">
//             {/* Present Students Section */}
//             <div className="attendance-section present">
//                 <h2>✅ Today's Present Students</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Student Name</th>
//                             <th>Batch</th>
//                             <th>Contact</th>
//                             <th>Father's Name</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {attendanceRecords.length > 0 ? (
//                             attendanceRecords.map((record) => (
//                                 <tr key={record._id}>
//                                     <td>{record.studentId?.name || "Unknown"}</td>
//                                     <td>{record.studentId?.batch || "N/A"}</td>
//                                     <td>{record.studentId?.contact || "N/A"}</td>
//                                     <td>{record.studentId?.fatherName || "N/A"}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4">No students present today</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Total Students Section */}
//             <div className="attendance-section absent">
//                 <h2>Total Registered Students</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Student Name</th>
//                             <th>Batch</th>
//                             <th>Contact</th>
//                             <th>Father's Name</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {absentStudents.length > 0 ? (
//                             absentStudents.map((student) => (
//                                 <tr key={student._id}>
//                                     <td>{student.name}</td>
//                                     <td>{student.batch || "N/A"}</td>
//                                     <td>{student.contact || "N/A"}</td>
//                                     <td>{student.fatherName || "N/A"}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4">No students absent today</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AttendanceDashboard;
import axios from 'axios';
import "../../Styles/AttendanceDashboard.css"; // Import CSS for styling
import React, { useEffect, useState ,useRef } from 'react';

const AttendanceDashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [registeredStudents, setRegisteredStudents] = useState([]); // Renamed from absentStudents
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const passwordInputRef = useRef(null);
    useEffect(() => {
        if (!isAuthorized) return;
        const fetchData = async () => {
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

            try {
                // Fetch all students
                const studentsResponse = await axios.get('https://attendance-tracker-3t8w.onrender.com/api/students');
                setAllStudents(studentsResponse.data);

                // Fetch today's attendance records
                const attendanceResponse = await axios.get('https://attendance-tracker-3t8w.onrender.com/api/attendance');
                const todayRecords = attendanceResponse.data.filter(record =>
                    new Date(record.date).toISOString().split('T')[0] === today
                );
                setAttendanceRecords(todayRecords);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [isAuthorized]);

    useEffect(() => {
        if (allStudents.length > 0) {
            const presentStudentIds = new Set(attendanceRecords.map(record => record.studentId));

            // ✅ Exclude students whose names start with "Demo" from total registered students
            const registeredList = allStudents.filter(student => 
                !student.name.toLowerCase().startsWith("demo")
            );
            setRegisteredStudents(registeredList);
        }
    }, [attendanceRecords, allStudents]);
    const handlePasswordSubmit = () => {
        if (password === "678589") {
            setIsAuthorized(true);
            setTimeout(() => passwordInputRef.current?.focus(), 100);
        } else {
            alert("❌ Incorrect Password. Try Again.");
        }
    };
    if (!isAuthorized) {
        return (
            <div className="container">
                <h2>🔒 Enter Password to Access</h2>
                <input
                    ref={passwordInputRef}
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlePasswordSubmit}>Submit</button>
            </div>
        );
    }
    return (
        <div className="attendance-container">
            {/* Present Students Section */}
            <div className="attendance-section present">
                <h2>✅ Today's Present Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>  {/* Added Serial Number Column */}
                            <th>Student Name</th>
                            <th>Batch</th>
                            <th>Contact</th>
                            <th>Father's Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record, index) => (
                                <tr key={record._id}>
                                    <td>{index + 1}</td> {/* Serial Number */}
                                    <td>{record.studentId?.name || "Unknown"}</td>
                                    <td>{record.studentId?.batch || "N/A"}</td>
                                    <td>{record.studentId?.contact || "N/A"}</td>
                                    <td>{record.studentId?.fatherName || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No students present today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Total Registered Students Section (Excluding "Demo" Names) */}
            <div className="attendance-section registered">
                <h2>Total Registered Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th> {/* Added Serial Number Column */}
                            <th>Student Name</th>
                            <th>Batch</th>
                            <th>Contact</th>
                            <th>Father's Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredStudents.length > 0 ? (
                            registeredStudents.map((student, index) => (
                                <tr key={student._id}>
                                    <td>{index + 1}</td> {/* Serial Number */}
                                    <td>{student.name}</td>
                                    <td>{student.batch || "N/A"}</td>
                                    <td>{student.contact || "N/A"}</td>
                                    <td>{student.fatherName || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No registered students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceDashboard;


