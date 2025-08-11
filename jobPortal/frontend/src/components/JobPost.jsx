import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

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

  const cities = [
    "All",
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Negombo",
    "Anuradhapura",
    "Trincomalee",
    "Batticaloa",
    "Matara",
    "Ratnapura",
    "Kalutara",
    "Kurunegala",
    "Badulla",
    "Polonnaruwa",
    "Monaragala",
    "Nuwara Eliya",
    "Vavuniya",
    "Hambantota",
    "Mannar",
    "Kilinochchi",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      // Reset form fields optionally here
    }
  }, [dispatch, error, message]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-blue-100">
      <h3 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-4">
        Post A Job
      </h3>

      {/* Title */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-blue-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Job Type & Location */}
     
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
  <div className="relative">
    <label className="block mb-2 font-semibold text-blue-700">Job Type</label>
    <select
      value={jobType}
      onChange={(e) => setJobType(e.target.value)}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10 appearance-none"
    >
      <option value="">Select Job Type</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
    </select>
    <FaChevronDown
      className="pointer-events-none absolute right-3 top-14 transform -translate-y-1/2 text-blue-600"
      size={16}
    />
  </div>

  <div className="relative">
    <label className="block mb-2 font-semibold text-blue-700">Location (City)</label>
    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10 appearance-none"
    >
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
    <FaChevronDown
      className="pointer-events-none absolute right-3 top-14 transform -translate-y-1/2 text-blue-600"
      size={16}
    />
  </div>
</div>

      {/* Company Name */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-blue-700">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Textareas: Introduction, Responsibilities, Qualifications */}
      {[
        {
          label: "Company / Job Introduction",
          value: introduction,
          setter: setIntroduction,
          placeholder: "Company / Job Introduction",
        },
        {
          label: "Responsibilities",
          value: responsibilities,
          setter: setResponsibilities,
          placeholder: "Job Responsibilities",
        },
        {
          label: "Qualifications",
          value: qualifications,
          setter: setQualifications,
          placeholder: "Required Qualifications For Job",
        },
      ].map(({ label, value, setter, placeholder }) => (
        <div className="mb-5" key={label}>
          <label className="block mb-2 font-semibold text-blue-700">{label}</label>
          <textarea
            value={value}
            onChange={(e) => setter(e.target.value)}
            placeholder={placeholder}
            rows={6}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
          />
        </div>
      ))}

      {/* What We Offer (optional) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-blue-700">What We Offer</label>
          <span className="text-sm text-indigo-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          placeholder="What are we offering in return!"
          rows={6}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Job Niche */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-blue-700">Job Niche</label>
        <select
          value={jobNiche}
          onChange={(e) => setJobNiche(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        >
          <option value="">Select Job Niche</option>
          {nichesArray.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </div>

      {/* Salary */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-blue-700">Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Hiring Multiple Candidates (optional) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-blue-700">Hiring Multiple Candidates?</label>
          <span className="text-sm text-indigo-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Personal Website Title (optional) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-blue-700">Personal Website Name</label>
          <span className="text-sm text-indigo-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Personal Website Name/Title"
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Personal Website URL (optional) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-blue-700">Personal Website Link (URL)</label>
          <span className="text-sm text-indigo-500 flex items-center gap-1">
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="Personal Website Link (URL)"
                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-none pr-10"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handlePostJob}
          disabled={loading}
          className="btnbg-indigo-600 hover:bg-indigo-700 text-white bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </div>
  );
};

export default JobPost;
