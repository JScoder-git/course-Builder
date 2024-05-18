import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/addlink.css';

function AddLink() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleLinkNameChange = (event) => {
    setLinkName(event.target.value);
  };

  const handleLinkUrlChange = (event) => {
    setLinkUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCourses = courses.map(course => {
      if (course.courseName === selectedCourse) {
        if (!course.urls) {
          course.urls = [];
        }
        course.urls.push({ name: linkName, url: linkUrl });
      }
      return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    navigate('/');
  };

  return (
    <div className="add-link-page">
      <h1>Add Link to Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Course:</label>
          <select value={selectedCourse} onChange={handleCourseChange} required>
            <option value="" disabled>Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.courseName}>{course.courseName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Name of URL:</label>
          <input type="text" value={linkName} onChange={handleLinkNameChange} required />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input type="url" value={linkUrl} onChange={handleLinkUrlChange} required />
        </div>
        <button type="submit">Add Link</button>
      </form>
    </div>
  );
}

export default AddLink;
