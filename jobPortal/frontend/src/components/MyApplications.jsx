import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <div className="max-w-6xl mx-auto ">
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3">
            My Job Applications
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((element) => (
              <div
                key={element._id}
                className="p-5 rounded-xl border border-blue-200 bg-blue-50 shadow-sm"
              >
                <p className="mb-2">
                  <span className="font-semibold text-blue-600">Job Title:</span>{" "}
                  {element.jobInfo.jobTitle}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-blue-600">Name:</span>{" "}
                  {element.jobSeekerInfo.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-blue-600">Email:</span>{" "}
                  {element.jobSeekerInfo.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-blue-600">Phone:</span>{" "}
                  {element.jobSeekerInfo.phone}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-blue-600">Address:</span>{" "}
                  {element.jobSeekerInfo.address}
                </p>

                <div className="mb-4">
                  <span className="font-semibold text-blue-600 block mb-1">
                    Cover Letter:
                  </span>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={4}
                    disabled
                    className="w-full p-3 rounded-lg border border-blue-200 bg-white text-gray-700 focus:outline-none resize-none"
                  ></textarea>
                </div>

<div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => handleDeleteApplication(element._id)}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                  <Link
                    to={element.jobSeekerInfo?.resume?.url}
                    target="_blank"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
