import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";
import { FaChevronDown } from "react-icons/fa";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(
    user?.niches?.secondNiche || ""
  );
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");
const [openDropdownIndex, setOpenDropdownIndex] = React.useState(null);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user?.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, isUpdated]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

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

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
          Update Profile
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Phone Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Job Seeker Only */}
          {user?.role === "Job Seeker" && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  My Preferred Job Niches
                </label>
                <div className="grid sm:grid-cols-3 gap-4 mr-5">
                  {[firstNiche, secondNiche, thirdNiche].map((niche, i) => (
  <div key={i} className="relative w-full">
    <select
      value={niche}
      onChange={(e) =>
        i === 0
          ? setFirstNiche(e.target.value)
          : i === 1
          ? setSecondNiche(e.target.value)
          : setThirdNiche(e.target.value)
      }
      onFocus={() => setOpenDropdownIndex(i)}
      onBlur={() => setOpenDropdownIndex(null)}
      className="w-full p-3 pr-10 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none appearance-none"
    >
      {nichesArray.map((element, index) => (
        <option value={element} key={index}>
          {element}
        </option>
      ))}
    </select>
    <FaChevronDown
      className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-transform duration-300 ${
        openDropdownIndex === i ? "rotate-180" : ""
      }`}
      size={16}
    />
  </div>
))}

                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none"
                />
              </div>

              {/* Resume Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="block w-full text-sm text-gray-700 border border-blue-200 rounded-lg cursor-pointer bg-blue-50 focus:outline-none"
                />
                {user?.resume && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm">Current Resume:</p>
                    <Link
                      to={user.resume.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 text-right">
          <button
            onClick={handleUpdateProfile}

          type="button"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
