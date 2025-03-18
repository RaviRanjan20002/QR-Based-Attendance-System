import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const GenerateQRCode = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [qrCode, setQRCode] = useState("");

    const handleRegister =   async () => {
    const handleRegister =   async () => {
        const response = await axios.post("http://localhost:5000/api/students/register", { name, email });
        setQRCode(response.data.student.qrCode);
    };

    return (
        <div>
            <h2>Register Student</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            {/* <input type="tel" placeholder="phone no" pattern="[0-9]{1}[0-9]{1}[0-9]{1}" required/> */}
            <button onClick={handleRegister}>Generate QR Code</button>
            {qrCode && <QRCodeCanvas value={qrCode} />}
        </div>
    );
};

export default GenerateQRCode;