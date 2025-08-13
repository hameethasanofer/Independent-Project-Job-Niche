import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkills,
  addAchievements,
  updateSkills,
  updateAchievements,
  updateExtraCoCurricular,
  addExtraCoCurricular,
  deleteSkills,
  deleteAchievements,
  deleteExtraCoCurricular,
  deleteCoreSubjects,
  updateCoreSubjects,
  addCoreSubjects
} from "../redux/extraDetailsSlice";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from "axios";
import { BASE_URL } from "../api";

const ExtraDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const extraDetails = useSelector((state) => state.extraDetails);
  const profileData = useSelector((state) => state.profileDetails);
  const educationalData = useSelector((state) => state.educationDetails);
  const projectData = useSelector((state) => state.projectDetails);
  const experienceData = useSelector((state) => state.experienceDetails);
  const extraDetailsData = useSelector((state) => state.extraDetails);
  const [loading, setLoading] = useState(false);

  const handleAddItem = (type) => {
    if (type === "achievements") {
      dispatch(addAchievements());
    } else if (type === "extraCoCurricular") {
      dispatch(addExtraCoCurricular());
    } else if (type === "languages") {
      dispatch(addSkills({ type: "languages" }));
    } else if (type === "web") {
      dispatch(addSkills({ type: "web" }));
    } else if (type === "webFrameworks") {
      dispatch(addSkills({ type: "webFrameworks" }));
    } else if (type === "databases") {
      dispatch(addSkills({ type: "databases" }));
    } else if (type === "other") {
      dispatch(addSkills({ type: "other" }));
    } else if (type === "coreSubjects") {
      dispatch(addCoreSubjects());
    }
  };

  const handleInputChange = (index, type, value) => {
    if (
      type === "languages" ||
      type === "web" ||
      type === "webFrameworks" ||
      type === "databases" ||
      type === "other"
    ) {
      dispatch(updateSkills({ type, index, value }));
    } else if (type === "achievements") {
      dispatch(updateAchievements({ index, value }));
    } else if (type === "extraCoCurricular") {
      dispatch(updateExtraCoCurricular({ index, value }));
    } else if (type === "coreSubjects") {
      dispatch(updateCoreSubjects({ index, value }));
    }
  };

  const handleDeleteItem = (index, type) => {
    if (type === "achievements") {
      dispatch(deleteAchievements(index));
    } else if (type === "extraCoCurricular") {
      dispatch(deleteExtraCoCurricular(index));
    } else if (
      type === "languages" ||
      type === "web" ||
      type === "webFrameworks" ||
      type === "databases" ||
      type === "other"
    ) {
      dispatch(deleteSkills({ type, index }));
    } else if (type === "coreSubjects") {
      dispatch(deleteCoreSubjects(index));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const resumeData = {
      profile: profileData,
      education: educationalData,
      projects: projectData,
      experience: experienceData,
      extraDetails: extraDetailsData,
    };
    try {
      await axios.post(
        `${BASE_URL}/data/resume-data?id=${currentUser._id}`,
        { resumeData },
        { headers: { authorization: currentUser.token } }
      );
      toast.success("Data Saved Successfully!", {
        position: "top-left",
        autoClose: 1500,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in addResumeData:", error);
    }
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-2">
          <h1 className="text-4xl font-bold text-center">Extra Details</h1>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg mb-4 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Skills</h2>
          <hr className="mb-4" />

          {/* Languages */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Languages <span className="text-xs text-gray-500">(eg: C, C++, Java, Python)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraDetails?.skills?.languages?.map((language, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`language${index + 1}`}
                    value={language}
                    onChange={(e) =>
                      handleInputChange(index, "languages", e.target.value)
                    }
                    placeholder={`Language ${index + 1}`}
                    className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index, "languages")}
                    className="text-blue-700 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddItem("languages")}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              + Add Language
            </button>
          </div>

          {/* Web Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Web Development Skills <span className="text-xs text-gray-500">(eg: HTML, CSS, JavaScript)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraDetails?.skills?.web?.map((webSkill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`webSkill${index + 1}`}
                    value={webSkill}
                    onChange={(e) =>
                      handleInputChange(index, "web", e.target.value)
                    }
                    placeholder={`Web Skill ${index + 1}`}
                    className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index, "web")}
                    className="text-blue-700 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddItem("web")}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              + Add Web Skill
            </button>
          </div>

          {/* WebFrameworks Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Web Frameworks/Libraries <span className="text-xs text-gray-500">(eg: React, Angular, Bootstrap)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraDetails?.skills?.webFrameworks?.map((webFrame, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`webFrame${index + 1}`}
                    value={webFrame}
                    onChange={(e) =>
                      handleInputChange(index, "webFrameworks", e.target.value)
                    }
                    placeholder={`Web Framework ${index + 1}`}
                    className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index, "webFrameworks")}
                    className="text-blue-700 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddItem("webFrameworks")}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              + Add WebFrameworks Skill
            </button>
          </div>

          {/* Databases Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Databases <span className="text-xs text-gray-500">(eg: MySQL, MongoDB)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraDetails?.skills?.databases?.map((data, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`data${index + 1}`}
                    value={data}
                    onChange={(e) =>
                      handleInputChange(index, "databases", e.target.value)
                    }
                    placeholder={`Database ${index + 1}`}
                    className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index, "databases")}
                    className="text-blue-700 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddItem("databases")}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              + Add Databases Skill
            </button>
          </div>

          {/* Other Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">Other Skills <span className="text-xs text-gray-500">(eg: Leadership, Management, Teamwork)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extraDetails?.skills?.other?.map((or, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`or${index + 1}`}
                    value={or}
                    onChange={(e) =>
                      handleInputChange(index, "other", e.target.value)
                    }
                    placeholder={`Other ${index + 1}`}
                    className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index, "other")}
                    className="text-blue-700 hover:text-red-600 text-xl"
                    title="Delete"
                  >
                    <RiDeleteBin7Line />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddItem("other")}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              + Add Other Skills
            </button>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white p-6 rounded-lg mb-4 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Achievements</h2>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extraDetails?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  name={`achievement${index + 1}`}
                  value={achievement}
                  onChange={(e) =>
                    handleInputChange(index, "achievements", e.target.value)
                  }
                  placeholder={`Achievement ${index + 1}`}
                  className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteItem(index, "achievements")}
                  className="text-blue-700 hover:text-red-600 text-xl"
                  title="Delete"
                >
                  <RiDeleteBin7Line />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddItem("achievements")}
            className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            + Add Achievement
          </button>
        </div>

        {/* Extra Curricular Activities Section */}
        <div className="bg-white p-6 rounded-lg mb-4 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Extra Curricular Activities</h2>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extraDetails?.extraCoCurricular?.map((extraCurricular, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  name={`extraCurricular${index + 1}`}
                  value={extraCurricular}
                  onChange={(e) =>
                    handleInputChange(index, "extraCoCurricular", e.target.value)
                  }
                  placeholder={`Extra-Curricular ${index + 1}`}
                  className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-blue-700"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteItem(index, "extraCoCurricular")}
                  className="text-blue-700 hover:text-red-600 text-xl"
                  title="Delete"
                >
                  <RiDeleteBin7Line />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddItem("extraCoCurricular")}
            className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            + Add Activities
          </button>
        </div>

        <p className="text-center text-red-600 mt-4">
          *Please save your data to get edited next time
        </p>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Your Data"}
          </button>
        </div>

        <div className="flex justify-between mt-8 px-10">
          <Link
            to="/experience"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <span className="text-xl">&#8592;</span>
            <span>Experience Section</span>
          </Link>
          <Link
            to="/templates"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <span>Resume Templates</span>
            <span className="text-xl">&#8594;</span>
          </Link>
        </div>
      </div>
      </div>
  );
};

export default ExtraDetails;
