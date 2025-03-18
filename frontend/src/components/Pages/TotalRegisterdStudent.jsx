// import "../../Styles/TotalRegisterdStudent.css"; 
// import React, { useEffect, useState } from "react";
// import axios from "axios";


// const RegisteredStudents = () => {
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
//                     <h3>Total Registered Students: {students.length}</h3>
//                     </div>
//                     <table border="1">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Registration Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((student, index) => (
//                                 <tr key={student._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{student.name}</td>
//                                     <td>{student.email}</td>
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

// export default RegisteredStudents;
