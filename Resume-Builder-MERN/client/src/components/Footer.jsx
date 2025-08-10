// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="  bg-gray-800 text-white py-4 w-full">
      <div className="  max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} TaskNest. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/contact-us" className="hover:text-orange-300 transition text-white">
            Contact
          </a>
          <a href="/templates" className="hover:text-orange-300 transition text-white">
            Templates
          </a>
          <a href="/user-profile" className="hover:text-orange-300 transition text-white">
            Profile
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
