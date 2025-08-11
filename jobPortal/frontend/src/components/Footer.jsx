import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import { Briefcase } from "lucide-react";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
       <footer className="relative fixed bottom-0 z-10 bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold overflow-hidden">JobHub</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Find your dream job with JobHub. Connect with top companies and discover opportunities that match your skills.
              </p>
              <div className="flex space-x-4">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                  <span className="text-blue-600 font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                  <span className="text-blue-600 font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                  <span className="text-blue-600 font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Jobs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Companies</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-700/50 mt-8 pt-6 text-center">
            <p className="text-gray-400">© 2024 JobHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Footer;
