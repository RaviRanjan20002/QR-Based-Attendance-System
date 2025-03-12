import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const ScanQRCode = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      async (decodedText) => {
        setScanResult(decodedText);
        await axios.post("http://localhost:5000/api/attendance/mark", {
          studentId: decodedText,
        });
        alert("Attendance marked successfully!");
        scanner.clear();
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      <h2>Scan QR Code</h2>
      {!scanResult ? <div id="reader"></div> : <p>Scanned: {scanResult}</p>}
    </div>
  );
};

export default ScanQRCode;


