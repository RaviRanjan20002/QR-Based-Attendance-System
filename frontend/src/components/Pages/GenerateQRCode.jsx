

// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import { Link } from "react-router-dom";
// import "../../Styles/GenerateQRCode.css"; // Import CSS

// const GenerateQRCode = () => {
//     const [password, setPassword] = useState("");
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [qrCodeData, setQRCodeData] = useState(""); // ✅ Fixed QR Code data storage
//     const qrRef = useRef(null); // Reference for QR Code element
//     const nameInputRef = useRef(null); // Reference for name input field

//     const handlePasswordSubmit = () => {
//         if (password === "678589") {
//             setIsAuthorized(true);
//             setPassword(""); // Clear password
//             setTimeout(() => {
//                 nameInputRef.current?.focus(); // Focus on name input after rendering
//             }, 0);
//         } else {
//             alert("Incorrect Password");
//         }
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await axios.post(
//                 "https://attendance-tracker-3t8w.onrender.com/api/students/register",
//                 { name, email }
//             );

//             setQRCodeData(response.data.student._id); // ✅ Store correct student ID for QR
//         } catch (error) {
//             console.error("Error registering student:", error);
//             alert("Registration failed. Please try again.");
//         }
//     };

//     // ✅ Function to download QR Code as an image
//     const handleDownloadQRCode = () => {
//         if (!qrRef.current) return;

//         const canvas = qrRef.current.querySelector("canvas");
//         if (canvas) {
//             const link = document.createElement("a");
//             link.href = canvas.toDataURL("image/png");
//             link.download = `${name}_QR_Code.png`;
//             link.click();
//         }
//     };

//     if (!isAuthorized) {
//         return (
//             <div className="container">
//                 <h2>Enter Password to Access</h2>
//                 <input
//                     type="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button onClick={handlePasswordSubmit}>Submit</button>
//             </div>
//         );
//     }

//     return (
//         <div className="container">
//            <Link to="/registeredstudent">
//                <h3>Click here to check Total no of Registered Student</h3>
//            </Link> 
//             <h2>Register Student</h2>
//             <input
//                 ref={nameInputRef}
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <button onClick={handleRegister} disabled={!name.trim() || !email.trim()}>
//                 Generate QR Code
//             </button>

//             {qrCodeData && (
//                 <div className="qr-container" ref={qrRef}>
//                     <QRCodeCanvas value={qrCodeData} />
//                     <button onClick={handleDownloadQRCode} className="download-btn">
//                         Download QR Code
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GenerateQRCode;



