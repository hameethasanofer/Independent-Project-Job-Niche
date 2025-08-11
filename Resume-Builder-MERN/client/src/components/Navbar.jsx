import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/profile.png";
import { logoutUser } from "../redux/userSlice";
import { clearEducation } from "../redux/educationSlice";
import { clearProjects } from "../redux/projectSlice";
import { clearExperience } from "../redux/experienceSlice";
import { clearExtraDetails } from "../redux/extraDetailsSlice";
import { clearProfile } from "../redux/profileSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [sectionsAnchorEl, setSectionsAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSectionsClick = (event) => {
    setSectionsAnchorEl(event.currentTarget);
    setActiveButton("sections");
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
    setActiveButton("profile");
    setMobileMenuOpen(false);
  };

  const handleContactUsClick = () => {
    navigate('/contact-us');
    setActiveButton("contact");
    setMobileMenuOpen(false);
  };

  const handleTemplateClick = () => {
    navigate('/templates');
    setActiveButton("templates");
    setMobileMenuOpen(false);
  };

  const handleClose = () => {
    setSectionsAnchorEl(null);
  };

  const handleLogout = () => {
    toast.success("Logout Successful!", {
      position: "top-left",
      autoClose: 1500,
    });
    dispatch(logoutUser());
    dispatch(clearProfile());
    dispatch(clearEducation());
    dispatch(clearProjects());
    dispatch(clearExperience());
    dispatch(clearExtraDetails());
    setActiveButton("");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const sectionRoutes = ["/profile", "/education", "/projects", "/experience", "/extraDetails"];
    if (sectionRoutes.includes(location.pathname)) {
      setActiveButton("sections");
    } else if (location.pathname === "/templates") {
      setActiveButton("templates");
    } else if (location.pathname === "/contact-us") {
      setActiveButton("contact");
    } else {
      setActiveButton("");
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full h-16  bg-white z-50">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="resume" className="w-10 h-10" />
          <h1 className="text-xl font-semibold text-black">
            RESUME BUILDER
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {currentUser ? (
            <>
              <p
                onClick={handleSectionsClick}
                className={`cursor-pointer font-semibold transition-colors ${
                  activeButton === "sections" ? "text-indigo-600" : "text-black hover:text-indigo-600"
                }`}
              >
                Sections
              </p>
              <Menu
                anchorEl={sectionsAnchorEl}
                open={Boolean(sectionsAnchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ 
                  sx: { 
                    backgroundColor: "#f0f4ff",
                    color: "#4f46e5",
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        backgroundColor: "#e0e7ff",
                        color: "#4f46e5"
                      }
                    }
                  } 
                }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
                <MenuItem onClick={() => { navigate('/education'); handleClose(); }}>Education</MenuItem>
                <MenuItem onClick={() => { navigate('/projects'); handleClose(); }}>Projects</MenuItem>
                <MenuItem onClick={() => { navigate('/experience'); handleClose(); }}>Experience</MenuItem>
                <MenuItem onClick={() => { navigate('/extraDetails'); handleClose(); }}>Extra Details</MenuItem>
              </Menu>

              <p
                onClick={handleTemplateClick}
                className={`cursor-pointer font-semibold transition-colors ${
                  activeButton === "templates" ? "text-indigo-600" : "text-black hover:text-indigo-600"
                }`}
              >
                Templates
              </p>

              <p
                onClick={handleContactUsClick}
                className={`cursor-pointer font-semibold transition-colors ${
                  activeButton === "contact" ? "text-indigo-600" : "text-black hover:text-indigo-600"
                }`}
              >
                Contact Us
              </p>

              <p
                onClick={handleLogout}
                className="cursor-pointer font-semibold text-red-600 border border-red-600 rounded-md px-4 py-1 hover:bg-red-50"
              >
                Logout
              </p>

              <Avatar
                src={currentUser?.avatar}
                alt="user"
                onClick={handleProfileClick}
                className="cursor-pointer ml-2"
              />
            </>
          ) : (
            <Link to="/sign-in">
              <p className="font-semibold text-black hover:text-indigo-600 cursor-pointer">Login</p>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <CloseIcon sx={{ fontSize: 30 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 30 }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && currentUser && (
        <div className="md:hidden flex flex-col px-6 py-4 border-t border-gray-200 gap-4">
          <button
            onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "sections" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Profile
          </button>
          <button
            onClick={() => { navigate('/education'); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "sections" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Education
          </button>
          <button
            onClick={() => { navigate('/projects'); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "sections" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Projects
          </button>
          <button
            onClick={() => { navigate('/experience'); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "sections" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Experience
          </button>
          <button
            onClick={() => { navigate('/extraDetails'); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "sections" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Extra Details
          </button>
          <button
            onClick={() => { handleTemplateClick(); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "templates" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Templates
          </button>
          <button
            onClick={() => { handleContactUsClick(); setMobileMenuOpen(false); }}
            className={`text-left ${activeButton === "contact" ? "text-indigo-600" : "text-black"} hover:text-indigo-600`}
          >
            Contact Us
          </button>
          <button
            onClick={handleLogout}
            className="text-left text-red-600 border border-red-600 rounded px-4 py-1 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
