import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";

const Register = () => {
  const [role, setRole] = useState("Job Seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegsiter = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 p-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 overflow hidden">
              Join JobHub
            </h3>
            <p className="text-sm text-gray-500">
              Create your account and start your career journey
            </p>
          </div>

          <form onSubmit={handleRegsiter} className="space-y-6">
            {/* Role Switcher */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => setRole("Job Seeker")}
                className={`flex-1 py-2 border rounded-lg flex items-center justify-center gap-2 text-sm ${
                  role === "Job Seeker"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <FaRegUser />
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setRole("Employer")}
                className={`flex-1 py-2 border rounded-lg flex items-center justify-center gap-2 text-sm ${
                  role === "Employer"
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <FaRegUser />
                Employer
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                />
                <FaPencilAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                />
                <MdOutlineMailOutline className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative mt-1">
                <input
                  type="number"
                  placeholder="111-222-333"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                />
                <FaPhoneFlip className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                />
                <FaAddressBook className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                />
                <RiLock2Fill className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Conditional Fields */}
            {role === "Job Seeker" && (
              <>
                {/* Niche Fields */}
              
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {[firstNiche, secondNiche, thirdNiche].map((nicheValue, i) => (
    <div key={i}>
      <label className="text-sm font-medium text-gray-700">
        Your {["First", "Second", "Third"][i]} Niche
      </label>
      <div className="relative mt-1">
        <select
          value={nicheValue}
          onChange={(e) =>
            [setFirstNiche, setSecondNiche, setThirdNiche][i](e.target.value)
          }
          className="w-full border border-gray-270 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-blue-600 appearance-none"
        >
          <option value="">Your Niche</option>
          {nichesArray.map((niche, index) => (
            <option key={index} value={niche}>
              {niche}
            </option>
          ))}
        </select>

        {/* Dropdown icon */}
        <FaChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
      </div>
    </div>
  ))}
</div>

                {/* Cover Letter */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Resume
                  </label>
                  <input
                    type="file"
                    onChange={resumeHandler}
                    className="w-full border rounded-lg mt-1 p-2"
                    style={{ border: "none" }}
                  />
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-lg"
            >
              Create Account
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 underline">
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
