import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
          You have not posted any job!
        </h1>
      ) : (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-4">
            My Jobs
          </h3>

          <div className="space-y-8">
            {myJobs.map((job) => (
              <div
                key={job._id}
                className="border border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Job Title: </span>
                  {job.title}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Job Niche: </span>
                  {job.jobNiche}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Salary: </span>
                  {job.salary}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Location: </span>
                  {job.location}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Job Type: </span>
                  {job.jobType}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Company Name: </span>
                  {job.companyName}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Introduction: </span>
                  {job.introduction}
                </p>
                <p className="sub-sec mb-2">
                  <span className="font-semibold text-blue-700">Qualifications: </span>
                  {job.qualifications}
                </p>
                <p className="sub-sec mb-4">
                  <span className="font-semibold text-blue-700">Responsibilities: </span>
                  {job.responsibilities}
                </p>
                {job.offers && (
                  <p className="sub-sec mb-4">
                    <span className="font-semibold text-blue-700">What Are We Offering: </span>
                    {job.offers}
                  </p>
                )}

                <button
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
