// src/components/Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Always prevent default link behavior
    const featuresSection = document.getElementById("why-our-system");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 w-full bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-green-700">
        WoodID
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-green-700 font-medium transition duration-300"
        >
          Home
        </Link>
        <a
          href="#why-our-system" // Using # to prevent route change
          onClick={handleAboutClick}
          className="text-gray-700 hover:text-green-700 font-medium transition duration-300"
        >
          About
        </a>
        <Link
          to="/upload"
          className="text-gray-700 hover:text-green-700 font-medium transition duration-300"
        >
          Upload
        </Link>
        <Link
          to="/description"
          className="text-gray-700 hover:text-green-700 font-medium transition duration-300"
        >
          Result
        </Link>
      </div>

      {/* Get Started Button */}
      <Link
        to="/upload"
        className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-green-800 transition duration-300"
      >
        Get Started
      </Link>
    </nav>
  );
};

export default Navbar;