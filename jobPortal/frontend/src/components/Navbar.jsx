import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    setShow(false);
  };

  return (
    <>
      <nav className={show ? "navbar show_navbar " : "navbar"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : undefined
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jobs"
                onClick={() => setShow(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : undefined
                }
              >
                JOBS
              </NavLink>
            </li>
            <li>
              <a
                href="http://localhost:5174/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShow(false)}
              >
                RESUME
              </a>
            </li>

            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setShow(false)}
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : undefined
                    }
                  >
                    DASHBOARD
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/rd"
                    onClick={() => setShow(false)}
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : undefined
                    }
                  >
                    RD
                  </NavLink>
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <li className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                <NavLink
                  to="/login"
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : undefined
                  }
                >
                  LOGIN
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow((prev) => !prev)}
        />
      </nav>
    </>
  );
};

export default Navbar;
