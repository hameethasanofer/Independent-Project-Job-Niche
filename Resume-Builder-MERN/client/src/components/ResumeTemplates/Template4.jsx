import React, { useState } from "react";
import { useSelector } from "react-redux";
import github from "../../assets/github.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import moment from "moment";
import { FaEnvelope, FaPhone, FaLinkedin, FaStar, FaRegStar } from "react-icons/fa";
import Confetti from "react-confetti";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import html2pdf from "html2pdf.js";

export default function Template4() {
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const softwareSkills = [
    { name: "Microsoft Project", level: 5 },
    { name: "JIRA", level: 4 },
    { name: "Microsoft Excel", level: 4 },
    { name: "Lucidchart", level: 3 },
  ];

  const handleDownload = () => {
    try {
      const resumeContainer = document.querySelector(".resume-container");
      if (resumeContainer) {
        setLoading(true);
        const opt = {
          margin: 0.1,
          filename: "user-resume.pdf",
          image: { type: "jpeg", quality: 1.0 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf()
          .set(opt)
          .from(resumeContainer)
          .save()
          .then(() => {
            setLoading(false);
            setCongratsVisible(true);
            setTimeout(() => setCongratsVisible(false), 5000);
          });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 600 : 0}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 py-10 px-2">
        <div className="resume-container max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <aside className="md:w-1/3 bg-gradient-to-b from-yellow-400 to-yellow-600 text-black p-8 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-3xl font-bold text-yellow-400 shadow mb-2">
                {profile.firstName?.[0]}{profile.lastName?.[0]}
              </div>
              <h1 className="text-2xl font-bold tracking-wide">{profile.firstName} {profile.lastName}</h1>
              <div className="text-yellow-100 text-base">{profile.title || "Professional"}</div>
            </div>
            <div className="space-y-2 text-black text-sm">
              <div className="flex items-center gap-2"><FaPhone />{profile.mobile}</div>
              <div className="flex items-center gap-2"><FaEnvelope />{profile.email}</div>
              <div className="flex items-center gap-2"><FaLinkedin />{profile.linkden}</div>
              <div className="flex gap-2 mt-2">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="github" className="w-6 h-6 rounded-full bg-white p-1" />
                  </a>
                )}
                {profile.leetcode && (
                  <a href={profile.leetcode} target="_blank" rel="noopener noreferrer">
                    <img src={leetcode} alt="leetcode" className="w-6 h-6 rounded-full bg-white p-1" />
                  </a>
                )}
                {profile.codechef && (
                  <a href={profile.codechef} target="_blank" rel="noopener noreferrer">
                    <img src={codechef} alt="codechef" className="w-6 h-6 rounded-full bg-white p-1" />
                  </a>
                )}
                {profile.codeforces && (
                  <a href={profile.codeforces} target="_blank" rel="noopener noreferrer">
                    <img src={codeforces} alt="codeforces" className="w-6 h-6 rounded-full bg-white p-1" />
                  </a>
                )}
              </div>
            </div>
            {/* Skills */}
            <div>
              <h2 className="font-bold text-lg text-black mb-2">Skills</h2>
              <ul className="list-disc list-inside text-yellow-100 text-sm pl-4">
                {(extraDetails?.skills?.languages || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
                {(extraDetails?.skills?.web || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
                {(extraDetails?.skills?.webFrameworks || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
                {(extraDetails?.skills?.databases || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
                {(extraDetails?.skills?.other || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
            {/* Software */}
            <div>
              <h2 className="font-bold text-lg text-black mb-2">Software</h2>
              <div className="space-y-1">
                {softwareSkills.map((sw, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{sw.name}</span>
                    <span className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < sw.level ? (
                          <FaStar key={i} className="text-yellow-500" />
                        ) : (
                          <FaRegStar key={i} className="text-black opacity-20" />
                        )
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <main className="md:w-2/3 p-8 flex flex-col gap-8 bg-gray-50">
            {/* Profile Summary */}
            <section>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">Profile</h2>
              <div className="text-gray-900 text-base bg-yellow-50 rounded-xl p-4">
                {profile.summary ||
                  "Professional with 10+ years of experience specializing in IT project management for international logistics companies. Proven strength in business process improvement, stakeholder communication, and risk management."}
              </div>
            </section>
            {/* Experience */}
            <section>
              <h2 className="text-xl font-bold text-yellow-700 mb-4">Experience</h2>
              <div className="relative border-l-4 border-yellow-300 pl-6 space-y-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-7 top-2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></span>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{exp.role}</span>
                      <span>{moment(exp.start_date).format("MMM-YYYY")} - {moment(exp.end_date).format("MMM-YYYY")}</span>
                    </div>
                    <div className="italic text-gray-700">{exp.institute}</div>
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                      {exp.desc.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-yellow-700 mb-2">Projects</h2>
                {projects.map((project, idx) => (
                  <div key={idx} className="mb-4 bg-yellow-50 rounded-xl p-4 shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{project.title}</span>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline">
                        <i className="fa-solid fa-link"></i>
                      </a>
                    </div>
                    <div className="text-gray-500 text-sm">{project.techStack}</div>
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                      {project.description.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}
            {/* Education */}
            <section>
              <h2 className="text-xl font-bold text-yellow-700 mb-4">Education</h2>
              <div className="relative border-l-4 border-yellow-300 pl-6 space-y-8">
                <div className="relative">
                  <span className="absolute -left-7 top-2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></span>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{education.college}</span>
                    <span>{education.startYear} - {education.endYear}</span>
                  </div>
                  <div className="italic text-gray-700">{education.field} {education.branch && `- ${education.branch}`}</div>
                  {education.grades && <div className="text-gray-700 text-sm mt-1">CGPA: {education.grades}</div>}
                </div>
                <div className="relative">
                  <span className="absolute -left-7 top-2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></span>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{education.higherCollege}</span>
                    <span>{education.startYear2} - {education.endYear2}</span>
                  </div>
                  <div className="italic text-gray-700">{education.board1}</div>
                  {education.percentage && <div className="text-gray-700 text-sm mt-1">Per: {education.percentage}%</div>}
                </div>
                <div className="relative">
                  <span className="absolute -left-7 top-2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></span>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{education.school}</span>
                    <span>{education.startYear3} - {education.endYear3}</span>
                  </div>
                  <div className="italic text-gray-700">{education.board2}</div>
                  {education.percentage2 && <div className="text-gray-700 text-sm mt-1">Per: {education.percentage2}%</div>}
                </div>
              </div>
            </section>
            {/* Achievements & Extra Curricular */}
            {(extraDetails.achievements.length > 0 || extraDetails.extraCoCurricular.length > 0) && (
              <section>
                <h2 className="text-xl font-bold text-yellow-700 mb-2">Achievements & Extra Curricular</h2>
                <ul className="list-disc list-inside text-gray-800 text-sm bg-yellow-50 rounded-xl p-4">
                  {extraDetails.achievements.map((achieve, idx) => (
                    <li key={idx}>{achieve}</li>
                  ))}
                  {extraDetails.extraCoCurricular.map((extra, idx) => (
                    <li key={idx}>{extra}</li>
                  ))}
                </ul>
              </section>
            )}
            
          </main>
        </div>
        <div className="flex justify-center py-8">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  width: "12rem",
                  backgroundColor: "#000",
                  color: "yellow",
                  "&:hover": { backgroundColor: "#facc15", color: "#000" },
                }}
                onClick={handleDownload}
                endIcon={<DownloadIcon />}
                className="download-button"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Download"}
              </Button>
            </div>
      </div>
    </>
  );
}