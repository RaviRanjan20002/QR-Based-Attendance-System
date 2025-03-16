// import React, { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";

// const ScanQRCode = () => {
//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: { width: 250, height: 250 } },
//       false
//     );

//     scanner.render(
//       async (decodedText) => {
//         setScanResult(decodedText);
//         await axios.post("http://localhost:5000/api/attendance/mark", {
//           studentId: decodedText,
//         });
//         alert("Attendance marked successfully!");
//         scanner.clear();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );

//     return () => {
//       scanner.clear();
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Scan QR Code</h2>
//       {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}
//     </div>
//   );
// };

// export default ScanQRCode;


// import React, { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";
// import "../../Styles/ScanQRCode.css"; // Import CSS

// const ScanQRCode = () => {
//     const [password, setPassword] = useState("");
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [scanResult, setScanResult] = useState(null);

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

//         scanner.render(
//             async (decodedText) => {
//                 setScanResult(decodedText);
//                 await axios.post("http://localhost:5000/api/attendance/mark", {
//                     studentId: decodedText,
//                 });
//                 alert("Attendance marked successfully!");
//                 scanner.clear();
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//         return () => {
//             scanner.clear();
//         };
//     }, [isAuthorized]);

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
//             {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}
//         </div>
//     );
// };

// export default ScanQRCode;

// import React, { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";
// import "../../Styles/ScanQRCode.css"; // Import CSS

// const ScanQRCode = () => {
//     const [password, setPassword] = useState("");
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [scanResult, setScanResult] = useState(null);

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

//         scanner.render(
//             async (decodedText) => {
//                 setScanResult(decodedText);

//                 try {
//                     const response = await axios.post("https://attendance-tracker-3t8w.onrender.com/api/attendance/mark", {
//                         studentId: decodedText,
//                     });

//                     if (response.data.message === "Attendance marked successfully") {
//                         alert("Attendance marked successfully!");
//                     }
//                 } catch (error) {
//                     if (error.response) {
//                         // Handling specific error messages from the backend
//                         if (error.response.status === 400 && error.response.data.message === "Attendance already marked") {
//                             alert("Your attendance is already marked.");
//                         } else if (error.response.status === 404 && error.response.data.message === "Student not found") {
//                             alert("Invalid QR code.");
//                         } else {
//                             alert("Error marking attendance. Please try again.");
//                         }
//                     } else {
//                         alert("Server error. Try again later.");
//                     }
//                 }

//                 scanner.clear();
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//         return () => {
//             scanner.clear();
//         };
//     }, [isAuthorized]);

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
//             {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}
//         </div>
//     );
// };

// export default ScanQRCode;
// import React, { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "axios";
// import "../../Styles/ScanQRCode.css";

// const ScanQRCode = () => {
//     const [password, setPassword] = useState("");
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [scanResult, setScanResult] = useState(null);
//     const [message, setMessage] = useState("");  // State for displaying messages
//     const [showMessage, setShowMessage] = useState(false); // State for modal visibility
//     const [scannerInstance, setScannerInstance] = useState(null); // Store scanner instance

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

//         setScannerInstance(scanner); // Save scanner instance
//         scanner.render(
//             async (decodedText) => {
//                 console.log("Scanned QR Code Data:", decodedText);  // Log the scanned data
//                 scanner.pause();  // Stop scanning to prevent multiple detections
        
//                 try {
//                     const response = await axios.post("https://attendance-tracker-3t8w.onrender.com/api/attendance/mark", {
//                         studentId: decodedText.trim(),  // Remove extra spaces if any
//                     });
        
//                     if (response.data.message === "Attendance marked successfully") {
//                         setMessage("✅ Attendance marked successfully!");
//                     } else {
//                         setMessage("⚠ Error marking attendance. Please try again.");
//                     }
//                 } catch (error) {
//                     console.error("Error Response:", error.response);
//                     if (error.response) {
//                         if (error.response.status === 400 && error.response.data.message === "Attendance already marked") {
//                             setMessage("⚠ Your attendance is already marked.");
//                         } else if (error.response.status === 404 && error.response.data.message === "Student not found") {
//                             setMessage("❌ Invalid QR code.");
//                         } else {
//                             setMessage("❌ Error marking attendance. Please try again.");
//                         }
//                     } else {
//                         setMessage("❌ Server error. Try again later.");
//                     }
//                 }
        
//                 setShowMessage(true); // Show message modal
//             },
//             (error) => {
//                 console.error("QR Scanner Error:", error);
//             }
//         );
//         return () => {
//             scanner.clear();
//         };
//     }, [isAuthorized]);

//     // Function to close the message modal and resume scanning
//     const handleCloseMessage = () => {
//         setShowMessage(false);
//         setMessage("");
//         if (scannerInstance) {
//             scannerInstance.resume(); // Resume scanner after closing the message
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
//             {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}

//             {/* Message Modal */}
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
import React, { useEffect, useState } from "react";
import "../../Styles/ScanQRCode.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const ScanQRCode = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [scannerInstance, setScannerInstance] = useState(null);

    const handlePasswordSubmit = () => {
        if (password === "678589") {
            setIsAuthorized(true);
        } else {
            alert("Incorrect Password");
        }
    };

    useEffect(() => {
        if (!isAuthorized) return;

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        setScannerInstance(scanner);

        scanner.render(
            async (decodedText) => {
                console.log("Scanned QR Code Data:", decodedText);

                // ✅ Ensure the scanned text is a valid MongoDB ObjectId
                if (!decodedText.match(/^[0-9a-fA-F]{24}$/)) {
                    setMessage("❌ Invalid QR code. Please scan again.");
                    setShowMessage(true);
                    return;
                }

                scanner.pause();

                try {
                    const response = await axios.post(
                        "https://attendance-tracker-3t8w.onrender.com/api/attendance/mark",
                        { studentId: decodedText.trim() }
                    );

                    setMessage(response.data.message);
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setMessage("⚠ Attendance already marked.");
                        } else if (error.response.status === 404) {
                            setMessage("❌ Student not found.");
                        } else {
                            setMessage("❌ Error marking attendance.");
                        }
                    } else {
                        setMessage("❌ Server error. Try again later.");
                    }
                }

                setShowMessage(true);
            },
            (error) => {
                console.error("QR Scanner Error:", error);
            }
        );

        return () => {
            scanner.clear();
        };
    }, [isAuthorized]);

    const handleCloseMessage = () => {
        setShowMessage(false);
        setMessage("");
        if (scannerInstance) {
            scannerInstance.resume();
        }
    };

    if (!isAuthorized) {
        return (
            <div className="container">
                <h2>Enter Password to Access</h2>
                <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handlePasswordSubmit}>Submit</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Scan QR Code</h2>
            <div id="reader"></div>

            {showMessage && (
                <div className="message-modal">
                    <div className="message-content">
                        <p>{message}</p>
                        <button onClick={handleCloseMessage}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanQRCode;


