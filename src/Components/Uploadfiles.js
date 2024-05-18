import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/uploadfile.css';

function UploadFiles() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [resourceFile, setResourceFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleNameChange = (event) => {
    setResourceName(event.target.value);
  };

  const handleFileChange = (event) => {
    setResourceFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCourses = courses.map(course => {
      if (course.courseName === selectedCourse) {
        // Create a new resource object for the uploaded file
        const newResource = {
          name: resourceName.trim() !== '' ? resourceName : resourceFile.name, // Use provided name or file name
          type: resourceFile.type, // Get the file type
          file: resourceFile
        };
        // If resources array doesn't exist, create it, otherwise push new resource
        if (!course.resources) {
          course.resources = [newResource];
        } else {
          course.resources.push(newResource);
        }
      }
      return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    navigate('/');
  };

  return (
    <div className="upload-files-page">
      <div className="form-container">
        <h1 className="upload-title">Upload Resource to Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseSelect">Select Course:</label>
            <select id="courseSelect" value={selectedCourse} onChange={handleCourseChange} required>
              <option value="" disabled>Select a course</option>
              {courses.map((course, index) => (
                <option key={index} value={course.courseName}>{course.courseName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="resourceName">Resource Name:</label>
            <input
              type="text"
              id="resourceName"
              value={resourceName}
              onChange={handleNameChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="resourceFile">Upload Resource:</label>
            <input
              type="file"
              id="resourceFile"
              onChange={handleFileChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="upload-button">Upload Resource</button>
        </form>
      </div>
    </div>
  );
}

export default UploadFiles;