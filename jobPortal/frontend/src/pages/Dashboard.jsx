import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAllUserErrors } from "../store/slices/userSlice";

import {
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiEdit2,
  FiLock,
  FiFileText,
  FiBriefcase,
  FiClipboard,
  FiMenu,
  FiX,
} from "react-icons/fi";

import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const [show, setShow] = useState(true); // desktop sidebar expanded/collapsed
  const [mobileOpen, setMobileOpen] = useState(false); // mobile sidebar open/close
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  const commonMenuItems = [
    {
      name: "My Profile",
      icon: <FiUser size={18} />,
      component: "My Profile",
      roles: ["Employer", "Job Seeker", "Admin"],
    },
    {
      name: "Update Profile",
      icon: <FiEdit2 size={18} />,
      component: "Update Profile",
      roles: ["Employer", "Job Seeker", "Admin"],
    },
    {
      name: "Update Password",
      icon: <FiLock size={18} />,
      component: "Update Password",
      roles: ["Employer", "Job Seeker", "Admin"],
    },
    {
      name: "My Applications",
      icon: <FiFileText size={18} />,
      component: "My Applications",
      roles: ["Job Seeker"],
    },
  ];

  const employerMenuItems = [
    {
      name: "Post New Job",
      icon: <FiClipboard size={18} />,
      component: "Job Post",
      roles: ["Employer"],
    },
    {
      name: "My Jobs",
      icon: <FiBriefcase size={18} />,
      component: "My Jobs",
      roles: ["Employer"],
    },
    {
      name: "Applications",
      icon: <FiFileText size={18} />,
      component: "Applications",
      roles: ["Employer"],
    },
  ];

  const getMenuItemsToShow = () => {
    if (!user) return [];

    if (!show) {
      // Collapsed sidebar desktop: only common menu for user role
      return commonMenuItems.filter((item) => item.roles.includes(user.role));
    } else {
      // Expanded sidebar desktop: common + employer (if Employer)
      let items = commonMenuItems.filter((item) =>
        item.roles.includes(user.role)
      );
      if (user.role === "Employer") {
        items = [...items, ...employerMenuItems];
      }
      return items;
    }
  };

  const menuItems = getMenuItemsToShow();

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // On mobile, clicking menu item closes sidebar and sets component
  const handleMenuItemClick = (component) => {
    setComponentName(component);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <section className="min-h-[calc(100vh-97px)] bg-blue-50 flex relative">
      {/* MOBILE MENU BUTTON - visible only on mobile */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-blue-600 shadow-md md:hidden"
        aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* SIDEBAR */}
     <aside
  className={`
    bg-white shadow-md border-r border-blue-200 transition-width duration-300 ease-in-out
    flex flex-col justify-between
    ${show ? "w-64" : "w-[97px]"}

    md:h-auto
    md:relative

    fixed top-0 left-0 z-40
    transform md:translate-x-0
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

    md:static md:transform-none
  `}
  style={{ height: "calc(100vh - 97px)" }} // Use height instead of minHeight
>
        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto p-4 pt-16 md:pt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuItemClick(item.component)}
                  className={`w-full text-left rounded-md flex items-center px-3 py-2
                    transition-colors duration-200
                    ${
                      componentName === item.component
                        ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white font-semibold"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  title={show ? "" : item.name} // tooltip on collapse desktop
                >
                  <span
                    className={`flex-shrink-0 mr-3 p-1 rounded
                      ${
                        componentName === item.component
                          ? "bg-blue-100 text-blue-600"
                          : "text-blue-600"
                      }`}
                  >
                    {item.icon}
                  </span>
                  {(show || mobileOpen) && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile bottom */}
        <div className="border-t border-blue-200 flex items-center justify-between p-4">
          {/* Avatar + user info */}
          <div className="flex items-center space-x-3 overflow-hidden">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg select-none"
              title={user?.name || "User"}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                getInitials(user?.name)
              )}
            </div>
            {(show || mobileOpen) && (
              <div className="flex flex-col">
                <span className="text-blue-800 font-semibold truncate max-w-[120px]">
                  {user?.name}
                </span>
                <span className="text-blue-500 text-sm truncate max-w-[120px]">
                  {user?.role}
                </span>
              </div>
            )}
          </div>

          {/* Toggle button - desktop only */}
          <button
            onClick={() => setShow(!show)}
            aria-label="Toggle Sidebar"
            className="ml-3 p-2 rounded-full hover:bg-blue-100 text-blue-600 flex-shrink-0 hidden md:flex"
          >
            {show ? (
              <FiChevronLeft size={26} strokeWidth={3} />
            ) : (
              <FiChevronRight size={26} strokeWidth={3} />
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
     <main
  className={`
    flex-1 scroll-hide  p-6 bg-white rounded-r-lg shadow-inner
    transition-opacity duration-300 ease-in-out
    ${mobileOpen ? "opacity-50 pointer-events-none" : "opacity-100"}
  `}
  style={{ height: "calc(100vh - 97px)", overflowY: "auto" }}
  onClick={() => {
    if (mobileOpen) setMobileOpen(false);
  }}
>
        {(() => {
          switch (componentName) {
            case "My Profile":
              return <MyProfile />;
            case "Update Profile":
              return <UpdateProfile />;
            case "Update Password":
              return <UpdatePassword />;
            case "Job Post":
              return <JobPost />;
            case "My Jobs":
              return <MyJobs />;
            case "Applications":
              return <Applications />;
            case "My Applications":
              return <MyApplications />;
            default:
              return <MyProfile />;
          }
        })()}
      </main>
    </section>
  );
};

export default Dashboard;
