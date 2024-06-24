import React, { useState } from 'react';

const LessonPlanUpload = ({ subjectId }) => {
  const [lessonPlan, setLessonPlan] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setLessonPlan(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!lessonPlan) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('lessonPlan', lessonPlan);
    formData.append('subjectId', subjectId);

    try {
      const response = await fetch(`http://localhost:3000/api/lessonplans/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setMessage('Lesson plan uploaded successfully.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Upload Lesson Plan</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LessonPlanUpload;
