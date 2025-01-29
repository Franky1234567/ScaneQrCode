import { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import { guestList } from "../data/tamulist";

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!isScanning) return;

    const startScanner = async () => {
      if (scannerRef.current) return;

      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          handleScan(result.data);
          setIsScanning(false);
        },
        {
          onDecodeError: (error) => console.error("Scan error:", error),
          maxScansPerSecond: 1,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          returnDetailedScanResult: true,
        }
      );

      await scannerRef.current.start();
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const handleScan = (qrData) => {
    const guest = guestList.find((g) => g.id === qrData);

    if (guest) {
      setScanResult(guest);
      setError("");
    } else {
      setScanResult(null);
      setError("QR Code tidak valid. Tamu tidak terdaftar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">QR Code Scanner</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
        {isScanning ? (
          <video ref={videoRef} className="w-full rounded-lg border border-gray-300"></video>
        ) : scanResult ? (
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-lg font-semibold text-green-700">Data Tamu:</p>
            <p><strong>Nama:</strong> {scanResult.namaTamu}</p>
            <p><strong>Status Tamu:</strong> {scanResult.statusTamu}</p>
            <p><strong>Nama Anak:</strong> {scanResult.namaAnak}</p>
            <p><strong>Status Anak:</strong> {scanResult.statusAnak}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Klik tombol untuk mulai scanning</p>
        )}
      </div>

      {error && (
        <div className="w-full max-w-md p-4 bg-red-100 text-red-700 text-center rounded-lg mt-4">
          {error}
        </div>
      )}

      <button
        onClick={() => {
          setScanResult(null);
          setError("");
          setIsScanning((prev) => !prev);
        }}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          isScanning ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isScanning ? "Berhenti Scanning" : "Mulai Scanning"}
      </button>
    </div>
  );
};

export default QRScanner;
