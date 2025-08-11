// src/components/ExtraDetails.jsx
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
} from "../redux/extraDetailsSlice";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import LanguageIcon from "@mui/icons-material/Language";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ExtraDetails = () => {
  const dispatch = useDispatch();
  const extraDetails = useSelector((state) => state.extraDetails);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, type, e) => {
    const value = e.target.value;
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
    }
  };

  const handleAddItem = (type) => {
    if (type === "achievements") {
      dispatch(addAchievements());
    } else if (type === "extraCoCurricular") {
      dispatch(addExtraCoCurricular());
    } else {
      dispatch(addSkills({ type }));
    }
  };

  const handleDeleteItem = (index, type) => {
    if (
      type === "languages" ||
      type === "web" ||
      type === "webFrameworks" ||
      type === "databases" ||
      type === "other"
    ) {
      dispatch(deleteSkills({ type, index }));
    } else if (type === "achievements") {
      dispatch(deleteAchievements(index));
    } else if (type === "extraCoCurricular") {
      dispatch(deleteExtraCoCurricular(index));
    }
  };

  return (
    <div className="min-h-[20vh] flex justify-center items-start p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="bg-white p-6 text-blue-700 rounded-lg mb-6 shadow">
          <h1 className="text-4xl font-bold">Extra Details</h1>
          <p className="opacity-90 mt-1 mb-4">
            Please fill in your extra details carefully
          </p>
          <hr />
        </div>

        {/* Section Cards */}

        {/* Languages */}
        <SectionCard
          icon={LanguageIcon}
          title="Languages"
          type="languages"
          data={extraDetails.skills?.languages || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("languages")}
          onDelete={handleDeleteItem}
          placeholder="Enter language"
        />

        {/* Web Development Skills */}
        <SectionCard
          icon={CodeIcon}
          title="Web Development Skills"
          type="web"
          data={extraDetails.skills?.web || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("web")}
          onDelete={handleDeleteItem}
          placeholder="Enter web development skill"
        />

        {/* Databases */}
        <SectionCard
          icon={StorageIcon}
          title="Databases"
          type="databases"
          data={extraDetails.skills?.databases || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("databases")}
          onDelete={handleDeleteItem}
          placeholder="Enter database skill"
        />

        {/* Other Skills */}
        <SectionCard
          icon={BuildIcon}
          title="Other Skills"
          type="other"
          data={extraDetails.skills?.other || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("other")}
          onDelete={handleDeleteItem}
          placeholder="Enter other skill"
        />

        {/* Achievements */}
        <SectionCard
          icon={EmojiEventsIcon}
          title="Achievements"
          type="achievements"
          data={extraDetails.achievements || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("achievements")}
          onDelete={handleDeleteItem}
          placeholder="Enter achievement"
        />

        {/* Extra Curricular Activities */}
        <SectionCard
          title="Extra Curricular Activities"
          type="extraCoCurricular"
          data={extraDetails.extraCoCurricular || []}
          onInputChange={handleInputChange}
          onAdd={() => handleAddItem("extraCoCurricular")}
          onDelete={handleDeleteItem}
          placeholder="Enter activity"
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link
            to="/experience"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <ArrowBackIcon /> Experience Section
          </Link>
          <Link
            to="/template"
            className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            Resume Template <ArrowForwardIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Card Component with CSS Grid for inputs
const SectionCard = ({
  icon: Icon,
  title,
  type,
  data = [],
  onInputChange,
  onAdd,
  onDelete,
  placeholder,
}) => (
  <div className="p-6 rounded-xl bg-white mb-6 shadow">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-blue-700 text-2xl font-semibold">
        {Icon && <Icon />}
        {title}
      </div>
    </div>

    {/* Inputs Container with CSS Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
      {data.length === 0 && (
        <p className="text-gray-500 italic col-span-full">
          No {title.toLowerCase()} added yet.
        </p>
      )}
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            type="text"
            value={item}
            onChange={(e) => onInputChange(index, type, e)}
            placeholder={placeholder}
            className="flex-1 p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-700 focus:outline-indigo-600"
          />
          <button
            onClick={() => onDelete(index, type)}
            className="p-2 rounded-full hover:bg-blue-100 transition"
            title="Delete"
            type="button"
          >
            <RiDeleteBin7Line className="text-blue-900 text-xl" />
          </button>
        </div>
      ))}
    </div>

    {/* Add Button */}
    <div className="flex justify-end">
      <button
        onClick={onAdd}
        className="bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        type="button"
      >
        Add {title}
      </button>
    </div>
  </div>
);

export default ExtraDetails;
