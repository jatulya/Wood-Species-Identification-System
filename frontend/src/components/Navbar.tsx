import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Wood Species 
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <Link to="/about" className="hover:text-blue-700">About</Link>
          <Link to="/services" className="hover:text-blue-700">Services</Link>
          <Link to="/contact" className="hover:text-blue-700">Contacts</Link>
        </div>

        {/* Login / Signup OR Profile / Logout */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="px-4 py-2 text-blue-700 border font-medium border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-blue-700 hover:text-white">
                Log In
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-white text-blue-800 rounded-lg font-medium hover:bg-white">
                Sign Up
              </Link>
            </>
          )}
        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-900 z-50 shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Menu Items */}
        <ul className="mt-12 space-y-4">
          <li><Link to="/" className="block hover:text-blue-700">Home</Link></li>
          <li><Link to="/about" className="block hover:text-blue-700">About</Link></li>
          <li><Link to="/services" className="block hover:text-blue-700">Services</Link></li>
          <li><Link to="/contact" className="block hover:text-blue-700">Contact</Link></li>
        </ul>

{/* Auth Links */}
<div className="mt-6">
  {isLoggedIn ? (
    <>
      <Link
        to="/profile"
        className="block text-gray-900 font-medium hover:text-blue-700"
      >
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-700 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <div className="flex flex-col gap-3">
      <Link
        to="/login"
        className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="block w-full text-center border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
      >
        Sign Up
      </Link>
    </div>
  )}


        </div>
        </div>
    </nav>
  );
};

export default Navbar;
