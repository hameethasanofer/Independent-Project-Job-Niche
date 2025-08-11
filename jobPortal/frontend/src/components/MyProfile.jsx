import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto p-1">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
          My Profile
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={user?.name || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Preferred Job Niches */}
          {user?.role === "Job Seeker" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue-600 mb-2">
                My Preferred Job Niches
              </label>
              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  disabled
                  value={user?.niches?.firstNiche || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
                />
                <input
                  type="text"
                  disabled
                  value={user?.niches?.secondNiche || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
                />
                <input
                  type="text"
                  disabled
                  value={user?.niches?.thirdNiche || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Phone Number
            </label>
            <input
              type="number"
              disabled
              value={user?.phone || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Address
            </label>
            <input
              type="text"
              disabled
              value={user?.address || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Role
            </label>
            <input
              type="text"
              disabled
              value={user?.role || ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Joined On */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Joined On
            </label>
            <input
              type="text"
              disabled
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
