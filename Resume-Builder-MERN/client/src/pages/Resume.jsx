// src/pages/Resume.js
import React, { useEffect, useState } from 'react';
import ResumeTemplate1 from '../components/ResumeTemplates/Template1';
import ResumeTemplate2 from '../components/ResumeTemplates/Template2';
import ResumeTemplate3 from '../components/ResumeTemplates/Template3';
import ResumeTemplate4 from '../components/ResumeTemplates/Template4';
import ResumeTemplate5 from '../components/ResumeTemplates/Template5';
import { useParams } from 'react-router-dom';

export default function Resume() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const { template } = useParams();

  useEffect(() => {
    if (template) {
      const templateNumber = parseInt(template.split('=')[1]);
      if (!isNaN(templateNumber)) {
        setSelectedTemplate(templateNumber);
      }
    }
  }, [template]);

  return (
    <>
      {selectedTemplate === 1 ? (
        <ResumeTemplate1 />
      ) : selectedTemplate === 2 ? (
        <ResumeTemplate2 />
      ) : selectedTemplate === 3 ? (
        <ResumeTemplate3 />
      ) : selectedTemplate === 4 ? (
        <ResumeTemplate4 />
      ) : selectedTemplate === 5 ? (
        <ResumeTemplate5 />
      ) : (
        <ResumeTemplate1 /> // fallback default
      )}
    </>
  );
}
