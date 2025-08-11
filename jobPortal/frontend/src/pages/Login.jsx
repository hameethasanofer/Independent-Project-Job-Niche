import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("Job Seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 p-6">
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-gray-800 overflow-hidden">
        Login to your account
      </h3>
    </div>

    <form onSubmit={handleLogin} className="space-y-6">
      {/* Role Toggle Buttons */}
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

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
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

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
      <div className="relative ">
  <input
    type="password"
    placeholder="Your Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border border-gray-270 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-600"
  />
  <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
</div>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-lg"
      >
        Login
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-purple-600 underline">
          Register Now
        </Link>
      </p>
    </form>
  </div>
</section>

    </>
  );
};

export default Login;
