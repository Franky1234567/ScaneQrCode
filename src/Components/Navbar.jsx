import PropTypes from "prop-types";


const Navbar = ({ setPage }) => {
    return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">QR Code System</h1>
        <div>
          <button
            onClick={() => setPage("generate")}
            className="mx-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200"
          >
            Generate QR Code
          </button>
          <button
            onClick={() => setPage("scan")}
            className="mx-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200"
          >
            Scan QR Code
          </button>
        </div>
      </nav>
    );
  };
  
  Navbar.propTypes = {
    setPage: PropTypes.func.isRequired,
  };

  export default Navbar;
  