// import React, { useEffect, useState } from "react"; 
// import axios from "axios";
// import "../../Styles/AttendanceDashboard.css"; // Add styles for better UI

// const StudentAttendanceHistory = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [students, setStudents] = useState([]); 
//     const [searchName, setSearchName] = useState("");
//     const [filteredRecords, setFilteredRecords] = useState([]);

//     useEffect(() => {
//         // ✅ Fetch all attendance records
//         axios.get("https://attendance-tracker-3t8w.onrender.com/api/attendance")
//             .then(response => setAttendanceRecords(response.data))
//             .catch(error => console.error("Error fetching attendance records:", error));

//         // ✅ Fetch all students
//         axios.get("https://attendance-tracker-3t8w.onrender.com/api/students")
//             .then(response => setStudents(response.data))
//             .catch(error => console.error("Error fetching students:", error));
//     }, []);

//     useEffect(() => {
//         if (searchName.trim() === "") {
//             setFilteredRecords([]);
//             return;
//         }

//         // ✅ Find the student by name (case-insensitive search)
//         const student = students.find(s => 
//             s.name.toLowerCase().includes(searchName.toLowerCase())
//         );

//         if (!student) {
//             setFilteredRecords([]);
//             return;
//         }

//         const studentId = student._id;
//         const studentAttendance = attendanceRecords.filter(record =>
//             record.studentId?._id === studentId
//         );

//         // ✅ Generate a complete date range from student registration to today
//         const startDate = new Date(student.createdAt || new Date());
//         const endDate = new Date(); // Today’s date
//         const dateArray = [];

//         let currentDate = new Date(startDate);
//         while (currentDate <= endDate) {
//             dateArray.push(new Date(currentDate).toISOString().split("T")[0]);
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         // ✅ Ensure today’s date is always included
//         const today = new Date().toISOString().split("T")[0];
//         if (!dateArray.includes(today)) {
//             dateArray.push(today);
//         }

//         // ✅ Convert existing attendance records into a Set for quick lookup
//         const presentDates = new Set(studentAttendance.map(record => 
//             new Date(record.date).toISOString().split("T")[0]
//         ));

//         // ✅ Create full attendance history, marking missing dates as "Absent"
//         const fullAttendance = dateArray.map(date => ({
//             date,
//             status: presentDates.has(date) ? "Present" : "Absent",
//             student: {
//                 name: student.name,
//                 email: student.email,
//                 batch: student.batch || "N/A",
//                 contact: student.contact || "N/A",
//                 fatherName: student.fatherName || "N/A"
//             }
//         }));

//         setFilteredRecords(fullAttendance);
//     }, [searchName, attendanceRecords, students]);

//     return (
//         <div className="attendance-history-container">
//             <h2>📅 Student Attendance History</h2>
//             <input
//                 type="text"
//                 value={searchName}
//                 placeholder="Enter student name"
//                 onChange={(e) => setSearchName(e.target.value)}
//                 className="search-input"
//             />

//             <table className="attendance-table">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Student Name</th>
//                         <th>Email</th>
//                         <th>Batch</th>
//                         <th>Father's Name</th>
//                         <th>Contact</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredRecords.length > 0 ? (
//                         filteredRecords.map((record, index) => (
//                             <tr key={index}>
//                                 <td>{record.date}</td>
//                                 <td>{record.student?.name || "Unknown"}</td>
//                                 <td>{record.student?.email || "Unknown"}</td>
//                                 <td>{record.student?.batch || "N/A"}</td>
//                                 <td>{record.student?.fatherName || "N/A"}</td>
//                                 <td>{record.student?.contact || "N/A"}</td>
//                                 <td className={record.status === "Absent" ? "absent" : "present"}>
//                                     {record.status}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7">No records found</td>
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
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/attendance")
            .then(response => setAttendanceRecords(response.data))
            .catch(error => console.error("Error fetching attendance records:", error));

        // Fetch students
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/students")
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
            student: { 
                name: student.name, 
                batch: student.batch || "N/A",
                fatherName: student.fatherName || "N/A",
                contact: student.contact || "N/A"
            }
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
                        <th>Batch</th>
                        <th>Father's Name</th>
                        <th>Contact</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.student?.name || "Unknown"}</td>
                                <td>{record.student?.batch || "N/A"}</td>
                                <td>{record.student?.fatherName || "N/A"}</td>
                                <td>{record.student?.contact || "N/A"}</td>
                                <td style={{ color: record.status === "Absent" ? "red" : "green", fontWeight: "bold" }}>
                                    {record.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAttendanceHistory;