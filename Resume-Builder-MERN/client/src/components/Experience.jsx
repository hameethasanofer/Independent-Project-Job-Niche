import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "../redux/experienceSlice";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";

const Experience = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experienceDetails);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(updateExperience({ index, field: name, value }));
  };

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience(index));
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start">
      <div className="w-[370rem]">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-2">
          <h1 className="text-4xl font-bold">Professional Experience</h1>
          <p className="opacity-90 mt-1 mb-4">
            Please fill in your experience details carefully
          </p>
          <hr />
        </div>

        {/* Experience Form Sections */}
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border border-blue-200"
          >
            {/* Header Row with Delete */}
            <div className="md:col-span-2 flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-blue-700">
                Experience {index + 1}
              </h2>
              <button
                onClick={() => handleDeleteExperience(index)}
                className="text-blue-900 hover:text-blue-800 transition text-2xl"
                title="Delete Experience"
              >
                <RiDeleteBin7Line />
              </button>
            </div>

            {/* Left Column */}
            <div className="space-y-6">
              {renderInput("role", "Role", exp.role, (e) =>
                handleInputChange(index, e)
              )}
              {renderInput("institute", "Institute / Organization", exp.institute, (e) =>
                handleInputChange(index, e)
              )}
              {renderInput(
                "startDate",
                "Start Date",
                exp.startDate,
                (e) => handleInputChange(index, e),
                "date"
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {renderInput(
                "endDate",
                "End Date",
                exp.endDate,
                (e) => handleInputChange(index, e),
                "date"
              )}
              {renderTextarea(
                "description",
                "Description",
                exp.description,
                (e) => handleInputChange(index, e)
              )}
            </div>
          </div>
        ))}

        {/* Add Experience Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddExperience}
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            + Add Experience
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link
            to="/projects"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            ← Project Section
          </Link>
          <Link
            to="/extraDetails"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Extra Details Section →
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Input
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

// Reusable Textarea
const renderTextarea = (name, label, value, onChange) => (
  <div>
    <label
      htmlFor={name}
      className="block text-lg font-medium text-blue-700 mb-1"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={4}
      value={value || ""}
      onChange={onChange}
      placeholder={label}
      className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-indigo-600"
    />
  </div>
);

export default Experience;
