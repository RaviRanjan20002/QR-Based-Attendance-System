
// import React, { useEffect, useState } from "react";
// import "../../Styles/ScanQRCode.css";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";

// const ScanQRCode = () => {
//     const [password, setPassword] = useState("");
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [message, setMessage] = useState("");
//     const [showMessage, setShowMessage] = useState(false);
//     const [scannerInstance, setScannerInstance] = useState(null);

//     const handlePasswordSubmit = () => {
//         if (password === "678589") {
//             setIsAuthorized(true);
//         } else {
//             alert("Incorrect Password");
//         }
//     };

//     useEffect(() => {
//         if (!isAuthorized) return;

//         const scanner = new Html5QrcodeScanner(
//             "reader",
//             { fps: 10, qrbox: { width: 250, height: 250 } },
//             false
//         );

//         setScannerInstance(scanner);

//         scanner.render(
//             async (decodedText) => {
//                 console.log("Scanned QR Code Data:", decodedText);

//                 // ✅ Ensure the scanned text is a valid MongoDB ObjectId
//                 if (!decodedText.match(/^[0-9a-fA-F]{24}$/)) {
//                     setMessage("❌ Invalid QR code. Please scan again.");
//                     setShowMessage(true);
//                     return;
//                 }

//                 scanner.pause();

//                 try {
//                     const response = await axios.post(
//                         "https://attendance-tracker-3t8w.onrender.com/api/attendance/mark",
//                         { studentId: decodedText.trim() }
//                     );

//                     setMessage(response.data.message);
//                 } catch (error) {
//                     if (error.response) {
//                         if (error.response.status === 400) {
//                             setMessage("⚠ Attendance already marked.");
//                         } else if (error.response.status === 404) {
//                             setMessage("❌ Student not found.");
//                         } else {
//                             setMessage("❌ Error marking attendance.");
//                         }
//                     } else {
//                         setMessage("❌ Server error. Try again later.");
//                     }
//                 }

//                 setShowMessage(true);
//             },
//             (error) => {
//                 console.error("QR Scanner Error:", error);
//             }
//         );

//         return () => {
//             scanner.clear();
//         };
//     }, [isAuthorized]);

//     const handleCloseMessage = () => {
//         setShowMessage(false);
//         setMessage("");
//         if (scannerInstance) {
//             scannerInstance.resume();
//         }
//     };

//     if (!isAuthorized) {
//         return (
//             <div className="container">
//                 <h2>Enter Password to Access</h2>
//                 <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
//                 <button onClick={handlePasswordSubmit}>Submit</button>
//             </div>
//         );
//     }

//     return (
//         <div className="container">
//             <h2>Scan QR Code</h2>
//             <div id="reader"></div>

//             {showMessage && (
//                 <div className="message-modal">
//                     <div className="message-content">
//                         <p>{message}</p>
//                         <button onClick={handleCloseMessage}>OK</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ScanQRCode;


