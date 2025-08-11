// src/components/ProjectDetailsForm.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject, deleteProject } from "../redux/projectSlice";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";

const ProjectDetailsForm = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectDetails);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(updateProject({ index, field: name, value }));
  };

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleDeleteProject = (index) => {
    dispatch(deleteProject(index));
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start">
      <div className="w-[370rem]">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-2">
          <h1 className="text-4xl font-bold">Projects Details</h1>
          <p className="opacity-90 mt-1 mb-4">
            Please fill in your project details carefully
          </p>
          <hr />
        </div>

        {/* Project Form */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 shadow"
          >
            {/* Title & Delete */}
            <div className="md:col-span-2 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-700">
                Project {index + 1}
              </h2>
              <button
                onClick={() => handleDeleteProject(index)}
                className="p-2 rounded-full hover:bg-blue-100 transition"
                title="Delete Project"
              >
                <RiDeleteBin7Line className="text-blue-900 text-2xl" />
              </button>
            </div>

            {/* Column 1 */}
            <div className="space-y-6">
              {renderInput(
                "title",
                "Project Title *",
                project.title,
                (e) => handleInputChange(index, e)
              )}
              {renderTextarea(
                "description",
                "Project Description *",
                project.description,
                (e) => handleInputChange(index, e)
              )}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {renderInput(
                "link",
                "Project Link (Hosted)",
                project.link,
                (e) => handleInputChange(index, e),
                "url"
              )}
              {renderInput(
                "techStack",
                "Project Tech Stack",
                project.techStack,
                (e) => handleInputChange(index, e)
              )}
            </div>
          </div>
        ))}

        {/* Add Project Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddProject}
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Add Project
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link
            to="/education"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            ← Education Section
          </Link>
          <Link
            to="/experience"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Experience Section →
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
      required={label.includes("*")}
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
      required={label.includes("*")}
    />
  </div>
);

export default ProjectDetailsForm;
