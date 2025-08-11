import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfile({ [name]: value }));
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start">
      <div className="w-[370rem]">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-2 text-bold">
          <h1 className="text-4xl font-bold">Personal Details</h1>
          <p className="opacity-90 mt-1 mb-4">Please fill in your information carefully</p>
          <hr />
        </div>

        {/* Form Section with full white background and padding */}
        <div className="p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            {renderInput("firstName", "First Name", currentProfile.firstName, handleChange)}
            {renderInput("lastName", "Last Name", currentProfile.lastName, handleChange)}
            {renderInput("email", "Email", currentProfile.email, handleChange, "email")}
            {renderInput("mobile", "Mobile Number", currentProfile.mobile, handleChange, "tel")}
            {renderTextarea("address", "Address", currentProfile.address, handleChange)}
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {renderInput("codeforces", "Codeforces Handle", currentProfile.codeforces, handleChange)}
            {renderInput("linkedIn", "LinkedIn Profile URL", currentProfile.linkedIn, handleChange, "url")}
            {renderInput("github", "GitHub Username", currentProfile.github, handleChange)}
            {renderInput("codechef", "CodeChef Username", currentProfile.codechef, handleChange)}
            {renderInput("leetcode", "LeetCode Username", currentProfile.leetcode, handleChange)}
          </div>

          {/* Link to Education */}
          <div className="md:col-span-2 flex justify-end">
            <Link
              to="/education"
              className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Education Section →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input field
const renderInput = (name, label, value, onChange, type = "text") => (
  <div>
    <label htmlFor={name} className="block text-lg font-medium text-blue-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-indigo-600 pr-10"
    />
  </div>
);

// Reusable textarea
const renderTextarea = (name, label, value, onChange) => (
  <div>
    <label htmlFor={name} className="block text-lg font-medium text-blue-700 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={3}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none focus:text-indigo-600 pr-10"
    />
  </div>
);

export default Profile;
