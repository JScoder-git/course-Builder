import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/newmodule.css';

function NewModule() {
  const [courseName, setCourseName] = useState('');
  const [urls, setUrls] = useState([{ url: '', name: '' }]);
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleUrlChange = (index, event) => {
    const newUrls = [...urls];
    newUrls[index].url = event.target.value;
    setUrls(newUrls);
  };

  const handleUrlNameChange = (index, event) => {
    const newUrls = [...urls];
    newUrls[index].name = event.target.value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, { url: '', name: '' }]);
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleResourceChange = (event) => {
    setResources([...resources, { file: event.target.files[0], name: '' }]);
  };

  const handleResourceNameChange = (index, event) => {
    const newResources = [...resources];
    newResources[index].name = event.target.value;
    setResources(newResources);
  };

  const handleRemoveResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCourse = {
      courseName,
      urls,
      resources: resources.map(({ file, name }) => ({
        name,
        type: file ? file.type : '', // Check if file exists before accessing its properties
        fileName: file ? file.name : '', // Check if file exists before accessing its properties
      })),
    };

    const existingCourses = JSON.parse(localStorage.getItem('courses')) || [];
    existingCourses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(existingCourses));

    navigate('/');
  };

  return (
    <div className="new-module-page">
      <div className="new-module-container">
        <h1 className="module-title">Create New Module</h1>
        <form className="new-module-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Course Name:</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={handleCourseNameChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="urls">URLs:</label>
            <ul className="url-list">
              {urls.map((url, index) => (
                <li key={index} className="url-item">
                  <input
                    type="url"
                    value={url.url}
                    onChange={(e) => handleUrlChange(index, e)}
                    placeholder="URL"
                    required={index === 0}
                    className="input-field"
                  />
                  <input
                    type="text"
                    value={url.name}
                    onChange={(e) => handleUrlNameChange(index, e)}
                    placeholder="Name"
                    required={index === 0}
                    className="input-field"
                  />
                  {urls.length > 1 && (
                    <button type="button" className="remove-url" onClick={() => handleRemoveUrl(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h1.5a1 1 0 0 1 1-1H14.5zM6 2h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button type="button" className="add-url" onClick={handleAddUrl}>
              
              Add URL
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="resources">Upload Resources:</label>
            <input
              type="file"
              id="resources"
              accept="image/*, application/pdf"
              onChange={handleResourceChange}
              className="input-field"
            />
            <ul className="resource-list">
              {resources.map((resource, index) => (
                <li key={index} className="resource-item">
                  <input
                    type="text"
                    value={resource.name}
                    onChange={(e) => handleResourceNameChange(index, e)}
                    placeholder="Name"
                    required
                    className="input-field"
                  />
                  {resource.file && resource.file.name}
                  <button type="button" className="remove-resource" onClick={() => handleRemoveResource(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h1.5a1 1 0 0 1 1-1H14.5zM6 2h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="save-module">Save Module</button>
        </form>
      </div>
    </div>
  );
}

export default NewModule;