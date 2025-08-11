import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];

  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-[130vh]">
        <div className="shadow-2xl bg-white rounded-2xl overflow-hidden">
          <div className="p-0">
            <div className="grid lg:grid-cols-2">
              
              {/* Left Side - Application Form */}
              <div className="p-8 border-r border-gray-200">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2 overflow-hidden">Application Form</h3>
                  <p className="text-gray-600">Fill out the form to apply for this position</p>
                </div>
                
                <form onSubmit={handlePostApplication} className="space-y-6">
                  <div>
                    <label className="text-xl text-gray-700 font-medium mb-2 block">Job Title</label>
                    <input
                      type="text"
                      placeholder={singleJob.title}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-xl text-gray-700 font-medium mb-2 block">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xl text-gray-700 font-medium mb-2 block">Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xl text-gray-700 font-medium mb-2 block">Phone Number</label>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xl text-gray-700 font-medium mb-2 block">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                  </div>

                  {user && user.role === "Job Seeker" && (
                    <>
                      <div>
                        <label className="text-xl text-gray-700 font-medium mb-2 block">Cover Letter</label>
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={6}
                          placeholder="Write your cover letter here..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-xl text-gray-700 font-medium mb-2 block">Resume</label>
                        <input
                          type="file"
                          onChange={resumeHandler}
                          accept=".pdf,.doc,.docx"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {name && email && phone && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <strong>Application Summary:</strong> {name}, {email}, {phone}, {address}
                    </div>
                  )}

                  {/* Additional Information Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 text-blue-600 mt-0.5">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Application Tips</h4>
                        <ul className="text-sm text-gray-600 space-y-1 ">
                          <li className="overflow-hidden">• Make sure all information is accurate</li>
                          <li className="overflow-hidden">• Upload your resume in PDF format</li>
                          <li className="overflow-hidden">• Write a compelling cover letter</li>
                          <li className="overflow-hidden">• Double-check your contact details</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 w-[1.9rem] h-[1.9rem] text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <span className="text-blue-600 underline cursor-pointer">Terms and Conditions</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>. I consent to the processing of my personal data for recruitment purposes.
                    </label>
                  </div>
                </form>
              </div>

              {/* Right Side - Job Details */}
              <div className="p-8 bg-gray-50">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-3 overflow-hidden">{singleJob.title}</h3>
                  {singleJob.personalWebsite && (
                    <Link 
                      target="_blank" 
                      to={singleJob.personalWebsite.url}
                      className="text-blue-600 hover:text-blue-800 underline mb-2 block "
                    >
                      {singleJob.personalWebsite.title}
                    </Link>
                  )}
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaLocationDot className="w-5 h-5 mr-2" />
                    <span className="text-2xl overflow-hidden">{singleJob.location}</span>
                  </div>
                  <div className="text-xl font-semibold text-green-600 mb-6">
                    Rs. {singleJob.salary} a month
                  </div>
                </div>

                {/* Job Details Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">Job Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <IoMdCash className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                      <div>
                        <div className="font-medium text-gray-800">Pay</div>
                        <div className="text-gray-600">{singleJob.salary} a month</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaToolbox className="w-5 h-5 mr-3 text-gray-500 mt-1" />
                      <div>
                        <div className="font-medium text-gray-800">Job type</div>
                        <div className="text-gray-600">{singleJob.jobType}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">Location</h3>
                  <div className="flex items-center text-gray-600">
                    <FaLocationDot className="w-5 h-5 mr-2" />
                    <span>{singleJob.location}</span>
                  </div>
                </div>

                {/* Full Job Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">Full Job Description</h3>
                    <p className="text-gray-600 mb-4">{singleJob.introduction}</p>
                  </div>
                  
                  {singleJob.qualifications && (
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-3">Qualifications</h4>
                      <ul className="text-gray-600 mb-4">
                        {qualifications.map((element, index) => (
                          <li key={index} className="mb-1">• {element}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {singleJob.responsibilities && (
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-3">Responsibilities</h4>
                      <ul className="text-gray-600 mb-4">
                        {responsibilities.map((element, index) => (
                          <li key={index} className="mb-1">• {element}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {singleJob.offers && (
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-3">Offering</h4>
                      <ul className="text-gray-600 mb-4">
                        {offering.map((element, index) => (
                          <li key={index} className="mb-1">• {element}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-800 mb-3">Job Niche</h4>
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      {singleJob.jobNiche}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered Apply Button spanning both columns */}
            {isAuthenticated && user.role === "Job Seeker" && (
              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex justify-center">
                  <button 
                    onClick={handlePostApplication}
                    disabled={loading || !agreeToTerms}
                    className={`px-16 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-xl rounded-lg transition-all duration-200 shadow-lg ${(loading || !agreeToTerms) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
                  >
                    {loading ? 'Applying...' : 'Apply'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostApplication;
