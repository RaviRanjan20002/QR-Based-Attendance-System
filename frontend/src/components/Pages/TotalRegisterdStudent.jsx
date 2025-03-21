
// import "../../Styles/TotalRegisterdStudent.css"; 
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TotalRegisteredStudent = () => {
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const response = await axios.get("https://attendance-tracker-3t8w.onrender.com/api/students");
//                 setStudents(response.data);
//             } catch (error) {
//                 setError("Failed to fetch students. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudents();
//     }, []);

//     return (
//         <div className="totalcontainer">
//             {loading ? (
//                 <p>Loading students...</p>
//             ) : error ? (
//                 <p className="error">{error}</p>
//             ) : (
//                 <>   
//                     <div className="total">
//                         <h3>Total Registered Students: {students.length}</h3>
//                     </div>
//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Batch</th>
//                                 <th>Father's Name</th>
//                                 <th>Contact</th>
//                                 <th>Registration Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((student, index) => (
//                                 <tr key={student._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{student.name}</td>
//                                     <td>{student.batch || "N/A"}</td>
//                                     <td>{student.fatherName || "N/A"}</td>
//                                     <td>{student.contact || "N/A"}</td>
//                                     <td>{new Date(student.createdAt).toLocaleDateString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };

// export default TotalRegisteredStudent;
import "../../Styles/TotalRegisterdStudent.css"; 
import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalRegisteredStudent = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("https://attendance-tracker-3t8w.onrender.com/api/students");

                // ❌ Exclude students whose names start with "Demo"
                const filteredStudents = response.data.filter(student => !student.name.toLowerCase().startsWith("demo"));

                // 🔽 Sort by Registration Date (Latest First)
                const sortedStudents = filteredStudents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setStudents(sortedStudents);
            } catch (error) {
                setError("Failed to fetch students. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="totalcontainer">
            {loading ? (
                <p>Loading students...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>   
                    <div className="total">
                        <h3>Total Registered Students: {students.length}</h3>
                    </div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Father's Name</th>
                                <th>Contact</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={student._id}>
                                        <td>{index + 1}</td> {/* Sr. No. */}
                                        <td>{student.name}</td>
                                        <td>{student.batch || "N/A"}</td>
                                        <td>{student.fatherName || "N/A"}</td>
                                        <td>{student.contact || "N/A"}</td>
                                        <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No students found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default TotalRegisteredStudent;

