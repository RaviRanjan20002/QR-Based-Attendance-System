

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DateHistory = () => {
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [searchDate, setSearchDate] = useState("");

//     const [registeredStudents, setRegisteredStudents] = useState([]);
//     const [presentStudents, setPresentStudents] = useState([]);
//     const [absentStudents, setAbsentStudents] = useState([]);

//     useEffect(() => {
//         // Fetch attendance records
//         axios.get("https://attendance-tracker-3t8w.onrender.com/api/attendance")
//             .then(response => setAttendanceRecords(response.data))
//             .catch(error => console.error("Error fetching attendance records:", error));

//         // Fetch student list and filter out names starting with "Demo"
//         axios.get("https://attendance-tracker-3t8w.onrender.com/api/students")
//             .then(response => {
//                 const filteredStudents = response.data.filter(student => !student.name.toLowerCase().startsWith("demo"));
//                 setStudents(filteredStudents);
//             })
//             .catch(error => console.error("Error fetching students:", error));
//     }, []);

//     useEffect(() => {
//         if (!searchDate) {
//             setRegisteredStudents([]);
//             setPresentStudents([]);
//             setAbsentStudents([]);
//             return;
//         }

//         const formattedDate = new Date(searchDate).toISOString().split("T")[0];

//         // ✅ Only students who registered on the selected date
//         const registered = students.filter(student => {
//             const registrationDate = new Date(student.createdAt).toISOString().split("T")[0];
//             return registrationDate === formattedDate;
//         });

//         // 🔹 Unchanged Present Students Logic
//         const present = attendanceRecords
//             .filter(record => new Date(record.date).toISOString().split("T")[0] === formattedDate)
//             .map(record => record.studentId?._id);

//         // 🔹 Unchanged Absent Students Logic
//         const absent = students.filter(student => {
//             const registrationDate = new Date(student.createdAt).toISOString().split("T")[0];
//             return registrationDate <= formattedDate && !present.includes(student._id);
//         });

//         setRegisteredStudents(registered);
//         setPresentStudents(students.filter(student => present.includes(student._id)));
//         setAbsentStudents(absent);
//     }, [searchDate, attendanceRecords, students]);

//     return (
//         <div>
//             <h2>Search Attendance by Date</h2>

//             {/* Date Input */}
//             <input
//                 type="date"
//                 value={searchDate}
//                 onChange={(e) => setSearchDate(e.target.value)}
//             />

//             {/* ✅ Present Students Table */}
//             <h3> ✅ Present Students on {searchDate}</h3>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Batch</th>
//                         <th>Father's Name</th>
//                         <th>Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {presentStudents.length > 0 ? (
//                         presentStudents.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>{student.batch || "N/A"}</td>
//                                 <td>{student.fatherName || "N/A"}</td>
//                                 <td>{student.contact || "N/A"}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No students were present on this date.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* ❌ Absent Students Table */}
//             <h3> ❌ Absent Students on {searchDate}</h3>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Batch</th>
//                         <th>Father's Name</th>
//                         <th>Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {absentStudents.length > 0 ? (
//                         absentStudents.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>{student.batch || "N/A"}</td>
//                                 <td>{student.fatherName || "N/A"}</td>
//                                 <td>{student.contact || "N/A"}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No students were absent on this date.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* 📝 Registered Students Table (Fixed) */}
//             <h3>📝 Registered Students on {searchDate}</h3>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Batch</th>
//                         <th>Father's Name</th>
//                         <th>Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {registeredStudents.length > 0 ? (
//                         registeredStudents.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>{student.batch || "N/A"}</td>
//                                 <td>{student.fatherName || "N/A"}</td>
//                                 <td>{student.contact || "N/A"}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No students registered on this date.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DateHistory;


import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";

const DateHistory = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const passwordInputRef = useRef(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchDate, setSearchDate] = useState("");

    const [registeredStudents, setRegisteredStudents] = useState([]);
    const [presentStudents, setPresentStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);

    useEffect(() => {
        if (!isAuthorized) return;
        // Fetch attendance records
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/attendance")
            .then(response => setAttendanceRecords(response.data))
            .catch(error => console.error("Error fetching attendance records:", error));

        // Fetch student list and filter out names starting with "Demo"
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/students")
            .then(response => {
                const filteredStudents = response.data.filter(student => !student.name.toLowerCase().startsWith("demo"));
                setStudents(filteredStudents);
            })
            .catch(error => console.error("Error fetching students:", error));
    }, [isAuthorized]);

    useEffect(() => {
        if (!searchDate) {
            setRegisteredStudents([]);
            setPresentStudents([]);
            setAbsentStudents([]);
            return;
        }

        const formattedDate = new Date(searchDate).toISOString().split("T")[0];

        // ✅ Only students who registered on the selected date
        const registered = students.filter(student => {
            const registrationDate = new Date(student.createdAt).toISOString().split("T")[0];
            return registrationDate === formattedDate;
        });

        // 🔹 Present Students Logic
        const present = attendanceRecords
            .filter(record => new Date(record.date).toISOString().split("T")[0] === formattedDate)
            .map(record => record.studentId?._id);

        // 🔹 Absent Students Logic
        const absent = students.filter(student => {
            const registrationDate = new Date(student.createdAt).toISOString().split("T")[0];
            return registrationDate <= formattedDate && !present.includes(student._id);
        });

        setRegisteredStudents(registered);
        setPresentStudents(students.filter(student => present.includes(student._id)));
        setAbsentStudents(absent);
    }, [searchDate, attendanceRecords, students]);
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
        <div>
            <h2>Search Attendance by Date</h2>

            {/* Date Input */}
            <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
            />

            {/* ✅ Present Students Table */}
            <h3> ✅ Present Students on {searchDate}</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Student Name</th>
                        <th>Batch</th>
                        <th>Father's Name</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {presentStudents.length > 0 ? (
                        presentStudents.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index + 1}</td> {/* Sr. No. */}
                                <td>{student.name}</td>
                                <td>{student.batch || "N/A"}</td>
                                <td>{student.fatherName || "N/A"}</td>
                                <td>{student.contact || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No students were present on this date.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ❌ Absent Students Table */}
            <h3> ❌ Absent Students on {searchDate}</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Student Name</th>
                        <th>Batch</th>
                        <th>Father's Name</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {absentStudents.length > 0 ? (
                        absentStudents.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index + 1}</td> {/* Sr. No. */}
                                <td>{student.name}</td>
                                <td>{student.batch || "N/A"}</td>
                                <td>{student.fatherName || "N/A"}</td>
                                <td>{student.contact || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No students were absent on this date.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 📝 Registered Students Table */}
            <h3>📝 Registered Students on {searchDate}</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Student Name</th>
                        <th>Batch</th>
                        <th>Father's Name</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredStudents.length > 0 ? (
                        registeredStudents.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index + 1}</td> {/* Sr. No. */}
                                <td>{student.name}</td>
                                <td>{student.batch || "N/A"}</td>
                                <td>{student.fatherName || "N/A"}</td>
                                <td>{student.contact || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No students registered on this date.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DateHistory;
