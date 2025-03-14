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

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import "../../Styles/ScanQRCode.css"; // Import CSS

const ScanQRCode = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [scanResult, setScanResult] = useState(null);

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

        scanner.render(
            async (decodedText) => {
                setScanResult(decodedText);

                try {
                    const response = await axios.post("http://localhost:5000/api/attendance/mark", {
                        studentId: decodedText,
                    });

                    if (response.data.message === "Attendance marked successfully") {
                        alert("Attendance marked successfully!");
                    }
                } catch (error) {
                    if (error.response) {
                        // Handling specific error messages from the backend
                        if (error.response.status === 400 && error.response.data.message === "Attendance already marked") {
                            alert("Your attendance is already marked.");
                        } else if (error.response.status === 404 && error.response.data.message === "Student not found") {
                            alert("Invalid QR code.");
                        } else {
                            alert("Error marking attendance. Please try again.");
                        }
                    } else {
                        alert("Server error. Try again later.");
                    }
                }

                scanner.clear();
            },
            (error) => {
                console.error(error);
            }
        );

        return () => {
            scanner.clear();
        };
    }, [isAuthorized]);

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
            {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}
        </div>
    );
};

export default ScanQRCode;
