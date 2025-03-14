// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentAttendanceHistory = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [students, setStudents] = useState([]); // Store all students
//     const [searchName, setSearchName] = useState("");
//     const [filteredRecords, setFilteredRecords] = useState([]);
//     const [allDates, setAllDates] = useState([]);

//     useEffect(() => {
//         // ✅ Fetch attendance records
//         axios.get("http://localhost:5000/api/attendance")
//             .then(response => {
//                 setAttendanceRecords(response.data);

//                 // Extract unique attendance dates
//                 const dates = [...new Set(response.data.map(record =>
//                     new Date(record.date).toISOString().split("T")[0]))];
//                 setAllDates(dates);
//             })
//             .catch(error => console.error("Error fetching attendance records:", error));

//         // ✅ Fetch all students
//         axios.get("http://localhost:5000/api/students")
//             .then(response => setStudents(response.data))
//             .catch(error => console.error("Error fetching students:", error));
//     }, []);

//     useEffect(() => {
//         if (searchName.trim() === "") {
//             setFilteredRecords([]);
//             return;
//         }

//         // ✅ Find student by name
//         const student = students.find(s =>
//             s.name.toLowerCase().includes(searchName.toLowerCase())
//         );

//         if (!student) {
//             setFilteredRecords([]);
//             return;
//         }

//         const studentId = student._id;

//         // ✅ Get student's attendance records
//         const studentAttendance = attendanceRecords.filter(record =>
//             record.studentId?._id === studentId
//         );

//         // ✅ Generate date range (from student registration to today)
//         const startDate = new Date(student.createdAt || new Date());
//         const endDate = new Date();
//         const dateArray = [];

//         let currentDate = new Date(startDate);
//         while (currentDate <= endDate) {
//             dateArray.push(currentDate.toISOString().split("T")[0]);
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         // ✅ Check present/absent status
//         const presentDates = new Set(studentAttendance.map(record =>
//             new Date(record.date).toISOString().split("T")[0]
//         ));

//         const fullAttendance = dateArray.map(date => ({
//             date,
//             status: presentDates.has(date) ? "Present" : "Absent",
//             student: { name: student.name, email: student.email }
//         }));

//         setFilteredRecords(fullAttendance);
//     }, [searchName, attendanceRecords, students]);

//     return (
//         <div>
//             <h2>Student Attendance History</h2>
//             <input
//                 type="text"
//                 placeholder="Enter student name"
//                 value={searchName}
//                 onChange={(e) => setSearchName(e.target.value)}
//             />
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Student Name</th>
//                         <th>Email</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredRecords.length > 0 ? (
//                         filteredRecords.map((record, index) => (
//                             <tr key={index}>
//                                 <td>{new Date(record.date).toLocaleDateString()}</td>
//                                 <td>{record.student?.name || "Unknown"}</td>
//                                 <td>{record.student?.email || "Unknown"}</td>
//                                 <td style={{ color: record.status === "Absent" ? "red" : "green", fontWeight: "bold" }}>
//                                     {record.status}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No records found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentAttendanceHistory;

import React, { useEffect, useState } from "react"; 
import axios from "axios";

const StudentAttendanceHistory = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]); 
    const [searchName, setSearchName] = useState("");
    const [filteredRecords, setFilteredRecords] = useState([]);

    useEffect(() => {
        // ✅ Fetch all attendance records
        axios.get("http://localhost:5000/api/attendance")
            .then(response => setAttendanceRecords(response.data))
            .catch(error => console.error("Error fetching attendance records:", error));

        // Fetch students
        axios.get("http://localhost:5000/api/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    useEffect(() => {
        if (searchName.trim() === "") {
            setFilteredRecords([]);
            return;
        }

        // ✅ Find student by name
        const student = students.find(s => 
            s.name.toLowerCase().includes(searchName.toLowerCase())
        );

        if (!student) {
            setFilteredRecords([]);
            return;
        }

        const studentId = student._id;
        const studentAttendance = attendanceRecords.filter(record =>
            record.studentId?._id === studentId
        );

        // ✅ Generate date range from student registration to today
        const startDate = new Date(student.createdAt || new Date());
        const endDate = new Date(); // Today’s date
        const dateArray = [];

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate).toISOString().split("T")[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // ✅ Ensure today’s date is always included
        const today = new Date().toISOString().split("T")[0];
        if (!dateArray.includes(today)) {
            dateArray.push(today);
        }

        // ✅ Convert existing attendance records into a Set for quick lookup
        const presentDates = new Set(studentAttendance.map(record => 
            new Date(record.date).toISOString().split("T")[0]
        ));

        // ✅ Create full attendance history including missing dates as "Absent"
        const fullAttendance = dateArray.map(date => ({
            date,
            status: presentDates.has(date) ? "Present" : "Absent",
            student: { name: student.name, email: student.email }
        }));

        setFilteredRecords(fullAttendance);
    }, [searchName, attendanceRecords, students]);

    return (
        <div>
            <h2>Student Attendance History</h2>
            <input
                type="text"
                value={searchName}
                placeholder="Enter student name"
                onChange={(e) => setSearchName(e.target.value)}
            />
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.student?.name || "Unknown"}</td>
                                <td>{record.student?.email || "Unknown"}</td>
                                <td style={{ color: record.status === "Absent" ? "red" : "green", fontWeight: "bold" }}>
                                    {record.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAttendanceHistory;

