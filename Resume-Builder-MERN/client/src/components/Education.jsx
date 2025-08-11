import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../redux/educationSlice";
import { Link } from "react-router-dom";

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.educationDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateEducation({ ...education, [name]: value }));
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start">
      <div className="w-[370rem]">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-2 font-bold">
          <h1 className="text-4xl font-bold">Educational Details</h1>
          <p className="opacity-90 mt-1 mb-4">
            Please fill in your education details carefully
          </p>
          <hr />
        </div>

        {/* Form Section */}
        <div className="p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            {renderInput("college", "College Name", education.college, handleChange)}
            {renderInput("year", "Year", education.year, handleChange)}
            {renderInput("field", "Field", education.field, handleChange)}
            {renderInput("branch", "Branch", education.branch, handleChange)}
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {renderInput("startYear", "Start Year", education.startYear, handleChange)}
            {renderInput("endYear", "End Year", education.endYear, handleChange)}
            {renderInput("city", "City", education.city, handleChange)}
            {renderInput("grades", "CGPA", education.grades, handleChange)}
          </div>

          {/* Navigation Buttons */}
          <div className="md:col-span-2 flex justify-between mt-4">
            <Link
              to="/profile"
              className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              ← Profile Section
            </Link>
            <Link
              to="/projects"
              className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Project Section →
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
    <label
      htmlFor={name}
      className="block text-lg font-medium text-blue-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value || ""}
      onChange={onChange}
      placeholder={label}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-indigo-600"
    />
  </div>
);

export default Education;
