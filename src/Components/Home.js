import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faLink, faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Navbar from './Navbar';
import '../CSS/home.css';
import emptyBoxImage from '../Images/no_results_found.png';
import linkImage from '../Images/broken-link.png'; // Adjust the path as necessary
import pdfIcon from '../Images/sheet.png'; // Adjust the path as necessary
import imageIcon from '../Images/upload.png'; // Adjust the path as necessary



function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editCourseIndex, setEditCourseIndex] = useState(null);
  const [newCourseName, setNewCourseName] = useState('');
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest('.dropdown-menu') && !event.target.closest('.add-button')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const handleCreateNewModule = () => {
    navigate('/new-module');
  };

  const handleAddLink = () => {
    navigate('/add-link');
  };

  const handleUploadFiles = () => {
    navigate('/upload-files');
  };

  const handleDeleteCourse = (courseName) => {
    const updatedCourses = courses.filter(course => course.courseName !== courseName);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  const handleEditCourse = (index) => {
    setEditCourseIndex(index);
    setNewCourseName(courses[index].courseName);
  };

  const handleEditUrl = (courseIndex, urlIndex) => {
    const updatedCourses = [...courses];
    const newUrl = prompt('Enter the new URL:', updatedCourses[courseIndex].urls[urlIndex].url);
    if (newUrl !== null) {
      updatedCourses[courseIndex].urls[urlIndex].url = newUrl;
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  const handleDeleteUrl = (courseIndex, urlIndex) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      const updatedCourses = [...courses];
      updatedCourses[courseIndex].urls.splice(urlIndex, 1);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  const handleSaveCourseName = (index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].courseName = newCourseName;
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    setEditCourseIndex(null);
    setNewCourseName('');
  };

  const handleViewResource = (courseIndex, resourceIndex) => {
    const course = courses[courseIndex];
    if (course && course.resources) {
      const resource = course.resources[resourceIndex];
      if (resource && resource.type) {
        if (resource.type === 'application/pdf' || (resource.type && resource.type.startsWith('image'))) {
          if (resource.file instanceof Blob) {
            window.open(URL.createObjectURL(resource.file), '_blank');
          } else {
            console.error('Resource file is not a Blob object');
          }
        } else if (resource.type === 'text/html' || resource.type === 'application/x-www-form-urlencoded') {
          if (resource.url) {
            window.open(resource.url, '_blank');
          } else {
            console.error('Resource URL is undefined');
          }
        }
      } else {
        console.error('Resource or its type is undefined');
      }
    } else {
      console.error('Course or its resources are undefined');
    }
  };

  const handleEditResource = (courseIndex, resourceIndex) => {
    const updatedCourses = [...courses];
    const currentResource = updatedCourses[courseIndex].resources[resourceIndex];
    const newName = prompt('Enter the new name for the resource:', currentResource.name);
    if (newName !== null) {
      updatedCourses[courseIndex].resources[resourceIndex].name = newName;
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  const handleDeleteResource = (courseIndex, resourceIndex) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedCourses = [...courses];
      updatedCourses[courseIndex].resources.splice(resourceIndex, 1);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const updatedCourses = [...courses];

    if (type === 'course') {
      const [movedCourse] = updatedCourses.splice(source.index, 1);
      updatedCourses.splice(destination.index, 0, movedCourse);
    } else {
      const sourceCourseIndex = parseInt(source.droppableId.split('-')[1], 10);
      const destCourseIndex = parseInt(destination.droppableId.split('-')[1], 10);

      if (source.droppableId === destination.droppableId) {
        if (type === 'url') {
          const [movedUrl] = updatedCourses[sourceCourseIndex].urls.splice(source.index, 1);
          updatedCourses[sourceCourseIndex].urls.splice(destination.index, 0, movedUrl);
        } else if (type === 'resource') {
          const [movedResource] = updatedCourses[sourceCourseIndex].resources.splice(source.index, 1);
          updatedCourses[sourceCourseIndex].resources.splice(destination.index, 0, movedResource);
        }
      } else {
        if (type === 'url') {
          const [movedUrl] = updatedCourses[sourceCourseIndex].urls.splice(source.index, 1);
          updatedCourses[destCourseIndex].urls.splice(destination.index, 0, movedUrl);
        } else if (type === 'resource') {
          const [movedResource] = updatedCourses[sourceCourseIndex].resources.splice(source.index, 1);
          updatedCourses[destCourseIndex].resources.splice(destination.index, 0, movedResource);
        }
      }
    }

    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="landing-page">
        <section className="hero">
          <h1>Course Builder</h1>
          <div style={{ position: 'relative' }}>
            <button className="add-button" onClick={() => setShowDropdown(!showDropdown)}>
              <FontAwesomeIcon icon={faPlus} /> Add
            </button>

            {showDropdown && (
              <div className="dropdown-menu" style={{ position: 'absolute', top: '100%' }}>
                <button onClick={handleCreateNewModule}>Create New Module</button>
                <button onClick={handleAddLink}>Add Link</button>
                <button onClick={handleUploadFiles}>Upload Files</button>
              </div>
            )}
          </div>
        </section>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-courses" type="course">
            {(provided) => (
              <section
                className="new-section"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {courses.length === 0 ? (
                  <>
                    <img src={emptyBoxImage} alt="Empty Box" className="empty-box-image" />
                    <h2>Nothing added here yet</h2>
                    <p>Click on the [+] Add button to add items to this course</p>
                  </>
                ) : (
                  <ul className="course-list">
                    {courses.map((course, courseIndex) => (
                      <Draggable
                        key={courseIndex}
                        draggableId={`course-${courseIndex}`}
                        index={courseIndex}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="course-item"
                            style={{
                                  ...provided.draggableProps.style,
                                  background: `radial-gradient(at right bottom, #d6a4a4, #dae2f8)`, // Corrected gradient
                                  boxShadow: '0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
                                  borderRadius: '23px',
                                  transition: 'all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1)',
                                  cursor: 'pointer',
                                }}


                          >
                            <div className="course-details">
                              {editCourseIndex === courseIndex ? (
                                <div>
                                  <input
                                    type="text"
                                    value={newCourseName}
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                  />
                                  <button onClick={() => handleSaveCourseName(courseIndex)}>Save</button>
                                </div>
                              ) : (
                                <>
                                  <h3>{course.courseName}</h3>
                                  <Droppable droppableId={`resources-${courseIndex}`} type="resource">
                                    {(provided) => (
                                      <div
                                        className="course-resources"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                      {course.resources && course.resources.length > 0 && (
                                           <>
                                    <h4>RESOURCES</h4>
                                    {course.resources.map((resource, resourceIndex) => (
                                      <Draggable
                                        key={`resource-${resourceIndex}`}
                                        draggableId={`resource-${courseIndex}-${resourceIndex}`}
                                        index={resourceIndex}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="course-resource"
                                            onClick={() => handleViewResource(courseIndex, resourceIndex)}
                                          >
                                            {resource.type === 'application/pdf' && (
                                              <img src={pdfIcon} alt="PDF Icon" className="resource-icon" />
                                            )}
                                            {resource.type && resource.type.startsWith('image') && (
                                              <img src={imageIcon} alt=" Icon" className="resource-icon" />
                                            )}
                                            {resource.type === 'text/html' ||
                                              resource.type === 'application/x-www-form-urlencoded' && (
                                                <FontAwesomeIcon icon={faLink} />
                                            )}
                                            <span className="resource-name">{resource.name}</span>
                                            <div className="resource-actions">
                                              <button onClick={() => handleEditResource(courseIndex, resourceIndex)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                              </button>
                                              <button onClick={() => handleDeleteResource(courseIndex, resourceIndex)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                  </>
                                )}

                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                  <Droppable droppableId={`urls-${courseIndex}`} type="url">
                                    {(provided) => (
                                      <div
                                        className="course-resources"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                        {course.urls && course.urls.length > 0 && (
                                          <>
                                            <h4>URL</h4>
                                            {course.urls.map((urlObj, urlIndex) => (
                                              <Draggable
                                                key={`url-${urlIndex}`}
                                                draggableId={`url-${courseIndex}-${urlIndex}`}
                                                index={urlIndex}
                                              >
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="course-resource"
                                                    onClick={() => window.open(urlObj.url, '_blank')}
                                                  >
                                                    <img src={linkImage} alt="Link Icon" className="link-icon" />
                                                    <span className="resource-name">{urlObj.name}</span>
                                                    <div className="resource-actions">
                                                      <button onClick={() => handleEditUrl(courseIndex, urlIndex)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                      </button>
                                                      <button onClick={() => handleDeleteUrl(courseIndex, urlIndex)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                      </button>
                                                    </div>
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}
                                          </>
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </>
                              )}
                              <div className="button-group">
                                <button className="edit-button" onClick={() => handleEditCourse(courseIndex)}>
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteCourse(course.courseName)}>
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
}

export default Home;
