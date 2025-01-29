import { useState } from "react";
import QRCode from "react-qr-code";

import { guestList } from "../data/tamulist";

const GenerateQR = () => {
  const [selectedGuest, setSelectedGuest] = useState(guestList[0]); // Default tamu pertama

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">QR Code Generator</h1>

      {/* Dropdown untuk memilih tamu */}
      <select
        className="mb-4 p-2 border rounded-lg text-gray-700"
        onChange={(e) => setSelectedGuest(guestList.find(g => g.id === e.target.value))}
        value={selectedGuest.id}
      >
        {guestList.map((guest) => (
          <option key={guest.id} value={guest.id}>
            {guest.namaTamu} - {guest.statusTamu}
          </option>
        ))}
      </select>

      {/* Kotak QR Code */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <QRCode value={selectedGuest.id} size={200} />
        <p className="mt-4 text-lg font-semibold">{selectedGuest.namaTamu}</p>
        <p className="text-gray-600">{selectedGuest.statusTamu}</p>
      </div>

      {/* Tombol Download QR Code */}
      <button
        onClick={() => {
          const canvas = document.querySelector("canvas");
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `${selectedGuest.namaTamu}-QR.png`;
          link.click();
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default GenerateQR;
