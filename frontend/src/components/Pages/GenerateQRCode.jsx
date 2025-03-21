
import React, { useState, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import "../../Styles/GenerateQRCode.css"; // Import CSS

const GenerateQRCode = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [contact, setContact] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [qrCodeData, setQRCodeData] = useState("");
    const qrRef = useRef(null);
    const nameInputRef = useRef(null);

    const handlePasswordSubmit = () => {
        if (password === "678589") {
            setIsAuthorized(true);
            setPassword("");
            setTimeout(() => nameInputRef.current?.focus(), 100);
        } else {
            alert("❌ Incorrect Password. Try Again!");
        }
    };

    const handleRegister = async () => {
        if (!/^\d{10}$/.test(contact)) {
            alert("⚠️ Contact number must be exactly 10 digits.");
            return;
        }

        try {
            const response = await axios.post("https://attendance-tracker-3t8w.onrender.com/api/students/register", {
                name, batch, contact, fatherName
            });

            if (response.data?.student?._id) {
                setQRCodeData(response.data.student._id);
            } else {
                throw new Error("Failed to generate student ID.");
            }
        } catch (error) {
            console.error("🚨 Error registering student:", error);
            alert(error.response?.data?.message || "⚠️ Registration failed. Please try again.");
        }
    };

    const handleDownloadQRCode = () => {
        if (!qrRef.current) return;

        const canvas = qrRef.current.querySelector("canvas");
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `${name}_QR_Code.png`;
            link.click();
        }
    };

    if (!isAuthorized) {
        return (
            <div className="container">
                <h2>🔒 Enter Password to Access</h2>
                <input
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
            <Link to="/registeredstudent">
                <h3>📋 View Registered Students</h3>
            </Link>
            <h2>📝 Register Student</h2>

            <input
                ref={nameInputRef}
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <select value={batch} onChange={(e) => setBatch(e.target.value)} required>
                <option value="" disabled>Select Batch</option>
                <option value="Arjun">Arjun</option>
                <option value="Aklavya">Aklavya</option>
                <option value="Madhav">Madhav</option>
                <option value="Dron">Dron</option>
                <option value="Bhism">Bhism</option>
            </select>

            <input
                type="tel"
                placeholder="Contact No"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                required
            />

            <button onClick={handleRegister} disabled={!name.trim() || !batch || !/^\d{10}$/.test(contact) || !fatherName.trim()}>
                🎟 Generate QR Code
            </button>

            {qrCodeData && (
                <div className="qr-container" ref={qrRef}>
                    <QRCodeCanvas value={qrCodeData} />
                    <button onClick={handleDownloadQRCode} className="download-btn">
                        📥 Download QR Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default GenerateQRCode;
