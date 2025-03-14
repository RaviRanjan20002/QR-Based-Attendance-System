// import React, { useState } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";

// const GenerateQRCode = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [qrCode, setQRCode] = useState("");

//     const handleRegister = async () => {
//         const response = await axios.post("http://localhost:5000/api/students/register", { name, email });
//         setQRCode(response.data.student.qrCode);
//     };

//     return (
//         <div>
//             <h2>Register Student</h2>
//             <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
//             <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
//             {/* <input type="tel" placeholder="phone no" pattern="[0-9]{1}[0-9]{1}[0-9]{1}" required/> */}
//             <button onClick={handleRegister}>Generate QR Code</button>
//             {qrCode && <QRCodeCanvas value={qrCode} />}
//         </div>
//     );
// };

// export default GenerateQRCode;
import React, { useState, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "../../Styles/GenerateQRCode.css"; // Import CSS

const GenerateQRCode = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [qrCode, setQRCode] = useState("");

    const nameInputRef = useRef(null); // Reference for name input field

    const handlePasswordSubmit = () => {
        if (password === "678589") {
            setIsAuthorized(true);
            setPassword(""); // Clear password
            setTimeout(() => {
                nameInputRef.current?.focus(); // Focus on name input after rendering
            }, 0);
        } else {
            alert("Incorrect Password");
        }
    };

    const handleRegister = async () => {
        const response = await axios.post("http://localhost:5000/api/students/register", { name, email });
        setQRCode(response.data.student.qrCode);
    };

    if (!isAuthorized) {
        return (
            <div className="container">
                <h2>Enter Password to Access</h2>
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
            <h2>Register Student</h2>
            <input
                ref={nameInputRef}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button onClick={handleRegister} disabled={!name.trim() || !email.trim()}>
                Generate QR Code
            </button>
            {qrCode && <div className="qr-container"><QRCodeCanvas value={qrCode} /></div>}
        </div>
    );
};

export default GenerateQRCode;



