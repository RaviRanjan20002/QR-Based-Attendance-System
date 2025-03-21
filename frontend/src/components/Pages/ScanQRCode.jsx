


import React, { useEffect, useState, useRef } from "react";
import "../../Styles/ScanQRCode.css";
import { Html5QrcodeScanner,Html5QrcodeScannerState} from "html5-qrcode";
import axios from "axios";

const ScanQRCode = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [scannedStudent, setScannedStudent] = useState(null);
    const scannerRef = useRef(null);
    const passwordInputRef = useRef(null);

    useEffect(() => {
        if (!isAuthorized) return;

        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );
        }

        scannerRef.current.render(
            async (decodedText) => {
                console.log("📸 Scanned QR Code Data:", decodedText);

                if (!decodedText.match(/^[0-9a-fA-F]{24}$/)) {
                    setMessage("❌ Invalid QR Code. Try Again.");
                    setShowMessage(true);
                    return;
                }

                // state add 

                if (scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
                    try {
                        scannerRef.current.pause();
                    } catch (error) {
                        console.error("Error pausing the scanner:", error);
                    }
                } else {
                    console.warn("Cannot pause, scanner is not scanning.");
                }

                try {
                    const response = await axios.post("https://attendance-tracker-3t8w.onrender.com/api/attendance/mark", { studentId: decodedText.trim() });
                    console.log("📥 Server Response:", response.data);
                    
                    const studentData = response.data.student || {}; 
                    setScannedStudent({
                        name: studentData.name || "N/A",
                        batch: studentData.batch || "N/A",
                        contact: studentData.contact || "N/A",
                        fatherName: studentData.fatherName || "N/A",
                    });

                    setMessage(response.data.message);
                } catch (error) {
                    setScannedStudent(null); 
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
                console.error("⚠ QR Scanner Error:", error);
            }
        );

        return () => {
            scannerRef.current?.clear();
        };
    }, [isAuthorized]);

    const handlePasswordSubmit = () => {
        if (password === "678589") {
            setIsAuthorized(true);
            setTimeout(() => passwordInputRef.current?.focus(), 100);
        } else {
            alert("❌ Incorrect Password. Try Again.");
        }
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
        setMessage("");
        setScannedStudent(null);
        scannerRef.current?.resume();
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
        <div className="container">
            <h2>📷 Scan QR Code</h2>
            <div id="reader"></div>

            {showMessage && (
                <div className="message-modal">
                    <div className="message-content">
                        <p>{message}</p>

                        {scannedStudent && (
                            <div className="student-info">
                                <p><strong>👤 Name:</strong> {scannedStudent.name}</p>
                                <p><strong>🎓 Batch:</strong> {scannedStudent.batch}</p>
                                <p><strong>📞 Contact:</strong> {scannedStudent.contact}</p>
                                <p><strong>👨‍👦 Father's Name:</strong> {scannedStudent.fatherName}</p>
                            </div>
                        )}

                        <button onClick={handleCloseMessage}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanQRCode;