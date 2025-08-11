import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAllUpdateProfileErrors, updatePassword } from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
          Update Password
        </h3>

        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-right">
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
