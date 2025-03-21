import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const StudentAttendanceHistory = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const passwordInputRef = useRef(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        if (!isAuthorized) return;

        // ✅ Fetch attendance records
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/attendance")
            .then(response => setAttendanceRecords(response.data))
            .catch(error => console.error("Error fetching attendance records:", error));

        // ✅ Fetch students and exclude "demo" names
        axios.get("https://attendance-tracker-3t8w.onrender.com/api/students")
            .then(response => {
                const filteredStudents = response.data.filter(student =>
                    !student.name.toLowerCase().startsWith("demo")
                );
                setStudents(filteredStudents);
            })
            .catch(error => console.error("Error fetching students:", error));
    }, [isAuthorized]);

    useEffect(() => {
        if (students.length === 0) return;
    
        // Find the earliest registration date
        const earliestDate = new Date(
            Math.min(...students.map(student => new Date(student.createdAt).getTime()))
        );
    
        // Ensure today's date is captured properly
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
    
        const dateArray = [];
        let currentDate = new Date(earliestDate);
    
        // ✅ Ensure correct iteration including today
        while (currentDate.toISOString().split("T")[0] <= todayStr) {
            dateArray.push(currentDate.toISOString().split("T")[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        setDates(dateArray);
    }, [students]);
    
    // ✅ Prepare attendance data for display
    const getAttendanceData = () => {
        return students.map(student => {
            const attendanceMap = new Map();

            // Mark "Present" dates
            attendanceRecords.forEach(record => {
                if (record.studentId?._id === student._id) {
                    const date = new Date(record.date).toISOString().split("T")[0];
                    attendanceMap.set(date, "Present");
                }
            });

            // Populate full date range with "Absent" where no record exists
            const attendanceData = dates.map(date => ({
                date,
                status: attendanceMap.get(date) || "Absent",
            }));

            // ✅ Count Present & Absent Days
            const presentCount = attendanceData.filter(att => att.status === "Present").length;
            const absentCount = attendanceData.length - presentCount;

            return { student, attendanceData, presentCount, absentCount };
        });
    };

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

    const attendanceData = getAttendanceData();

    return (
        <div>
            <h2>Student Attendance History</h2>

            {/* ✅ Added Scrollable Table Wrapper */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap", maxWidth: "100vw" }}>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Father's Name</th>
                            <th>Contact</th>
                            <th>Present</th>
                            <th>Absent</th>
                            {dates.map(date => (
                                <th key={date}>{date}</th> 
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.length > 0 ? (
                            attendanceData.map((studentData, index) => (
                                <tr key={studentData.student._id}>
                                    <td>{index + 1}</td>
                                    <td>{studentData.student.name}</td>
                                    <td>{studentData.student.batch || "N/A"}</td>
                                    <td>{studentData.student.fatherName || "N/A"}</td>
                                    <td>{studentData.student.contact || "N/A"}</td>
                                    <td style={{ fontWeight: "bold", color: "green" }}>
                                        {studentData.presentCount}
                                    </td>
                                    <td style={{ fontWeight: "bold", color: "red" }}>
                                        {studentData.absentCount}
                                    </td>
                                    {studentData.attendanceData.map(att => (
                                        <td key={att.date} style={{
                                            color: att.status === "Absent" ? "red" : "green",
                                            fontWeight: "bold"
                                        }}>
                                            {att.status}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7 + dates.length}>No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentAttendanceHistory;








