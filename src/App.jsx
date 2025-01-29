import { useState } from "react";
import Navbar from "./Components/Navbar";
import Scanner from "./Components/ScaneQr";
import GenerateQR from "./Components/Generateqr";

function App() {
  const [page, setPage] = useState("generate"); // Default ke Generate QR Code

  return (
    <div className="w-full bg-gray-100 ">
      <div className="h-screen w-full bg-gray-100">
        <Navbar setPage={setPage} />
        <div className="p-4">
          {page === "generate" ? <GenerateQR /> : <Scanner />}
        </div>
      </div>
    </div>
  );
}

export default App;
