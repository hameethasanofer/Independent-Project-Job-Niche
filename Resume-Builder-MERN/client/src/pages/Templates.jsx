import React, { useState, useEffect } from 'react';
import resume1 from '../assets/resume_template1.jpg';
import resume2 from '../assets/resume_template2.jpg';
import resume3 from '../assets/resume_template3.png';
import resume4 from '../assets/resume_template4.png';
import resume5 from '../assets/resume_template5.png';

import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import '../styles/template.css';

const TEMPLATE_WIDTH = 280;
const TEMPLATE_HEIGHT =390;

const templateList = [
  { img: resume1, alt: "Template 1" },
  { img: resume2, alt: "Template 2" },
  { img: resume3, alt: "Template 3" },
  { img: resume4, alt: "Template 4" },
  { img: resume5, alt: "Template 5" },
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  // Check premium expiry
useEffect(() => {
  const hasPremiumAccess = localStorage.getItem("premiumAccess") === "true";
  if (!hasPremiumAccess) return;

  const selectedMonths = localStorage.getItem("selectedPlanMonths");
  if (!selectedMonths) return;

  const months = parseInt(selectedMonths, 10);
  const oneMonthMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  const timeoutDuration = months * oneMonthMs;

  const timer = setTimeout(() => {
    localStorage.removeItem("premiumAccess");
    alert(`Premium access expired after ${months} month${months > 1 ? "s" : ""}!`);
    window.location.reload();
  }, timeoutDuration);

  return () => clearTimeout(timer);
}, []);


  const handleTemplateClick = (templateImage) => {
    setSelectedTemplate(templateImage);
  };

  const handleClose = () => {
    setSelectedTemplate(null);
  };

  const handleResumeClick = (templateNumber) => {
    const hasPremiumAccess = localStorage.getItem("premiumAccess") === "true";

    // Free templates or premium templates when access is active
    if (templateNumber <= 2 || hasPremiumAccess) {
      navigate(`/resume/template=${templateNumber}`);
    } else {
      // Otherwise, redirect to payment plans page
      navigate(`/plans?template=${templateNumber}`);
    }
  };

  return (
    <div
      className="container"
      style={{
        width: '100%',
        maxWidth: 1750,
        margin: '0 auto',
        padding: '44px 0 80px 0',
        minHeight: '100vh',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      <div className="flex flex-col items-center text-center py-0">
  <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 drop-shadow-md mt-0">
    Resume Templates
  </h1>
  <h2 className="mt-1 text-2xl font-semibold text-gray-600 tracking-wide mb-4 mt-4">
    Choose your favorite resume design
  </h2>
</div>



      <div
        className="template-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          justifyItems: 'center',
          alignItems: 'start',
          margin: 0,
          padding: '0 4px',
          boxSizing: 'border-box'
        }}
      >
        {templateList.map((tpl, idx) => {
          const templateNumber = idx + 1;
          const hasPremiumAccess = localStorage.getItem("premiumAccess") === "true";
          const isFreeTemplate = templateNumber <= 2;
          const buttonUnlocked = isFreeTemplate || hasPremiumAccess;

          return (
            <div
              key={idx}
              onClick={() => handleTemplateClick(tpl.img)}
              style={{
                width: TEMPLATE_WIDTH,
                height: TEMPLATE_HEIGHT + 90,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                cursor: 'pointer',
                padding: '12px 4px 14px 4px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                margin: 0,
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}
              className="template-card"
            >
              <img
                className="template"
                src={tpl.img}
                alt={tpl.alt}
                width={TEMPLATE_WIDTH}
                height={TEMPLATE_HEIGHT}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
                  marginBottom: 10,
                  background: '#eee',
                  width: TEMPLATE_WIDTH,
                  height: TEMPLATE_HEIGHT,
                  display: 'block'
                }}
              />
              <div style={{ flexGrow: 1 }} />
              <p
                style={{
                  margin: '12px 0 0 0',
                  color: buttonUnlocked ? '#4F46E5' : '#d32f2f',
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: 'center',
                  border: `1px solid ${buttonUnlocked ? '#4F46E5' : '#d32f2f'}`,
                  borderRadius: 6,
                  padding: '6px 0',
                  width: '100%',
                  background: buttonUnlocked ? '#e0e7ff' : '#e0e7ff',
                  cursor: 'pointer'
                }}
                onClick={e => {
                  e.stopPropagation();
                  handleResumeClick(templateNumber);
                }}
              >
                {buttonUnlocked ? 'Use Template' : 'Unlock with Premium'}
              </p>
            </div>
          );
        })}
      </div>

      {selectedTemplate && (
        <div className="template-preview-overlay" onClick={handleClose}>
          <div className="template-preview">
            <IconButton
              onClick={handleClose}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedTemplate}
              alt="Selected Template"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
