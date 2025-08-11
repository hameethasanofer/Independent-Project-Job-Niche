import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { Filter, MapPin, Briefcase, Building2 } from "lucide-react";
import { HiDocumentText } from "react-icons/hi";

import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, city, niche, searchKeyword]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

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
  "Kilinochchi"
];


  const nichesArray = [
    "All",
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
    <section className="px-6 py-12 bg-gray-50 min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
          Find Your Dream Job
        </h1>
        <p className="text-gray-500 mt-2">
          Discover opportunities that match your skills and interests
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow">
        {/* Search Input */}
        <div className="flex items-center w-full border rounded px-3 py-2">
          <FaSearch className="text-blue-500 mr-2" />
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            className="w-full focus:outline-none text-blue-600 "
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        {/* City Select */}
        <div className="relative w-full md:w-auto flex items-center border rounded px-3 py-2">
          <MapPin className="text-blue-600 mr-2 h-4 w-4" />
          <select
            className="appearance-none w-full bg-transparent text-blue-600 pr-6 focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">City</option>
            {cities.map((c, i) => (
              <option value={c} key={i} >
                {c}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4 pointer-events-none" />
        </div>

        {/* Niche Select */}
        <div className="relative w-full md:w-auto flex items-center border rounded px-3 py-2">
          <Briefcase className="text-blue-600 mr-2 h-4 w-4" />
          <select
            className="appearance-none w-full bg-transparent text-blue-600 pr-6 focus:outline-none"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          >
            <option value="">Niche</option>
            {nichesArray.map((n, i) => (
              <option value={n} key={i}>
                {n}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg flex flex-col justify-between border border-gray-100"
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <Building2 className="text-indigo-600 w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <Link
                      to="#"
                      className="text-blue-600 text-md hover:underline block mt-1"
                    >
                      {job.companyName}
                    </Link>
                  </div>
                </div>

                {/* Location + Date */}
                <div className="flex items-center text-sm text-gray-500 gap-2 mb-3 overflow-hidden">
                  <FaMapMarkerAlt className="h-4 w-4 " />
                  <span className="overflow-hidden">{job.location}</span>
                  <span className="overflow-hidden">·</span>
                  <span className="overflow-hidden">
                    {job.jobPostedOn?.substring(0, 10)}
                  </span>
                </div>

                {/* Job Type and Category */}
                <div className="flex gap-2 flex-wrap text-xs mb-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {job.jobType || "Full-time"}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {job.jobNiche || "Technology"}
                  </span>
                </div>

                {/* Salary */}
                <p className="text-green-600 font-bold text-sm mb-3">
                  Rs. {job.salary}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {job.offers ||
                    "Join our team to build great products and grow your career!"}
                </p>

                {/* Skills */}
                {/* Qualification */}
                {job.qualifications && (
                  <p className="text-sm text-gray-700 mb-4">
                    <span className="font-medium text-gray-800">
                      Qualification:
                    </span>{" "}
                    {job.qualifications}
                  </p>
                )}

                {/* Apply Button */}
                <Link
                  to={`/post/application/${job._id}`}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 px-4 rounded-lg mt-4 hover:opacity-90"
                >
                  Apply Now
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <img
                src="./notfound.png"
                alt="job-not-found"
                className="w-full max-w-md mx-auto"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Jobs;
