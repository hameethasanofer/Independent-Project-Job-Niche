import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";

export default function SuperUserProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    resumes: 0,
    projects: 0,
    experience: 0,
    completion: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/get-user/${currentUser._id}`,
        { headers: { authorization: currentUser.token } }
      );
      setFormData({
        username: res.data.username || "",
        email: res.data.email || "",
        password: "",
      });
      setStats({
        resumes: res.data.resumes?.length || 0,
        projects: res.data.projects?.length || 0,
        experience: res.data.experience?.length || 0,
        completion: res.data.profileCompletion || 0,
      });
    } catch (error) {
      toast.error("Failed to load user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL}/user/update/${currentUser._id}`,
        formData,
        { headers: { authorization: currentUser.token } }
      );
      toast.success("Profile Updated Successfully!", {
        position: "top-left",
        autoClose: 1500,
      });
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, [currentUser]);

  return (
    <div className="min-h-[60vh]  w-full flex justify-center items-start bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        {/* Centered User Avatar & Username */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={currentUser?.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-lg mb-4 object-cover"
          />
          <h2 className="text-3xl font-semibold text-indigo-700">{formData.username}</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Resumes", value: stats.resumes },
            { label: "Projects", value: stats.projects },
            { label: "Experience", value: stats.experience },
            { label: "Completion", value: `${stats.completion}%` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-indigo-50 rounded-lg text-center py-6 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <p className="text-3xl font-extrabold text-indigo-600">{value}</p>
              <p className="text-indigo-700 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 bg-indigo-50 rounded-xl p-6 max-w-[700px] mx-auto"
        >
          {renderInput("username", "Username", formData.username, handleChange)}
          {renderInput("email", "Email", formData.email, handleChange, "email")}
          {renderInput(
            "password",
            "New Password",
            formData.password,
            handleChange,
            "password",
            "Leave blank if you don't want to change password"
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <Link
            to="/"
            className="border border-indigo-600 text-indigo-600 rounded-lg py-2 px-6 font-semibold hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-600 hover:to-pink-600 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="border border-indigo-600 text-indigo-600 rounded-lg py-2 px-6 font-semibold hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-600 hover:to-pink-600 hover:text-white transition"
          >
            Edit Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
const renderInput = (name, label, value, onChange, type = "text", helperText = "") => (
  <div>
    <label htmlFor={name} className="block mb-1 font-medium text-indigo-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full p-4 rounded-lg border border-indigo-300 bg-indigo-100 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {helperText && <p className="text-sm text-indigo-600 mt-1">{helperText}</p>}
  </div>
);
