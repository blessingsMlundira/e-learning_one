import React, { useState, useEffect } from 'react';
import './TrainerHome.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@sanity/client';

function LecturerInnerCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseCapturedData = location.state?.course;
  console.log("captured course : ");
  console.log(courseCapturedData.courseID);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  let PROJECT_ID = "xsxj1ee7";
  let DATASET = "production";
  let QUERY = encodeURIComponent(`*[_type == "topic" && courseID == "${courseCapturedData.courseID}"]`);

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  useEffect(() => {
    // Fetch data from Sanity backend
    const fetchData = async () => {
      try {
        const response = await fetch(URL); // Specify the dataset (e.g., /categories)
        const data = await response.json();

        if (Array.isArray(data.result)) {
          console.log("found some data!!!!!!");
          setCourses(data.result);
          
          
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once
  let QUERY2 = encodeURIComponent(`*[_type == "courseAnnouncement" && courseID == "${courseCapturedData.courseID}"]`);

  // Compose the URL for your project's endpoint and add the query
  let URL2 = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY2}`;
  useEffect(() => {
    // Fetch data from Sanity backend
    const fetchData2 = async () => {
      try {
        const response = await fetch(URL2); // Specify the dataset (e.g., /categories)
        const data = await response.json();

        if (Array.isArray(data.result)) {
          console.log("found some announcements!!!!!!");
          setAnnouncements(data.result);
          
          
          
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    fetchData2();
  }, []); // Empty dependency array to ensure the effect runs only once
  let QUERY3 = encodeURIComponent(`*[_type == "courseAssignment" && courseID == "${courseCapturedData.courseID}"]`);

  // Compose the URL for your project's endpoint and add the query
  let URL3 = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY3}`;
  useEffect(() => {
    // Fetch data from Sanity backend
    const fetchData3 = async () => {
      try {
        const response = await fetch(URL3); // Specify the dataset (e.g., /categories)
        const data = await response.json();

        if (Array.isArray(data.result)) {
          console.log("found some assignments!!!!!!");
          setAssignments(data.result);
          
          
          
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    fetchData3();
  }, []); // Empty dependency array to ensure the effect runs only once

  



  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [newCourse, setNewCourse] = useState({ title: '', description: '', video: '', document: '' });

  const handleEditClick = course => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };
  const handleDeleteAnnouncement = async (announcementID) => {
    console.log("deleting announcement: ");
    console.log(announcementID);
    try {
        const client = createClient({
          projectId: 'xsxj1ee7',
          dataset: 'production',
          useCdn: true,
          apiVersion: '2021-10-21',
          token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl", // Only if you want to update content with the client
          ignoreBrowserTokenWarning: true
        });
    
       // Make a request to delete the announcement by ID
    // Make a request to delete the announcement by ID
    // const result2 = await client.delete(announcementID);
    client
    .delete({query: `*[_type == "courseAnnouncement" && announcementID== "${announcementID}"]`})
    .then(() => {
        console.log('announcement deleted');
        setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter((announcement) => announcement.announcementID !== announcementID)
        );
            console.log(`Announcement with ID ${announcementID} deleted successfully.`);
    })
    .catch((err) => {
        console.error('Delete failed: ', err.message)
    })

//     if (result2.length > 0) {
//       // If the delete operation is successful, update the state to remove the announcement
//       setAnnouncements((prevAnnouncements) =>
//         prevAnnouncements.filter((announcement) => announcement.announcementID !== announcementID)
//       );
//       console.log(`Announcement with ID ${announcementID} deleted successfully.`);
//     } else {
//       // Handle errors or unsuccessful deletion
//       console.error(`Failed to delete announcement with ID ${announcementID}.`);
//     }
  } catch (error) {
    // Handle network or other errors
    console.error('Error deleting announcement:', error);
  }
    };
    const handleDeleteAssignment = async (assignmentID) => {
      console.log("deleting assignment: ");
      console.log(assignmentID);
      try {
          const client = createClient({
            projectId: 'xsxj1ee7',
            dataset: 'production',
            useCdn: true,
            apiVersion: '2021-10-21',
            token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl", // Only if you want to update content with the client
            ignoreBrowserTokenWarning: true
          });
      
         // Make a request to delete the announcement by ID
      // Make a request to delete the announcement by ID
      // const result2 = await client.delete(announcementID);
      client
      .delete({query: `*[_type == "courseAssignment" && assignmentID== "${assignmentID}"]`})
      .then(() => {
          console.log('assignment deleted');
          window.location.reload();
          
      })
      .catch((err) => {
          console.error('Delete failed: ', err.message)
      })
  
  //     if (result2.length > 0) {
  //       // If the delete operation is successful, update the state to remove the announcement
  //       setAnnouncements((prevAnnouncements) =>
  //         prevAnnouncements.filter((announcement) => announcement.announcementID !== announcementID)
  //       );
  //       console.log(`Announcement with ID ${announcementID} deleted successfully.`);
  //     } else {
  //       // Handle errors or unsuccessful deletion
  //       console.error(`Failed to delete announcement with ID ${announcementID}.`);
  //     }
    } catch (error) {
      // Handle network or other errors
      console.error('Error deleting announcement:', error);
    }
      };
     
  

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
  };

  const handleSaveChanges = updatedCourse => {
    // Update the course details in the courses state
    const updatedCourses = courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setCourses(updatedCourses);
    setEditModalOpen(false);
  };

  const handleCreateCourse = async () => {
    console.log("create course button has been clicked!!!!!!!");
    // Create a new course and add it to the courses state
    const newCourseWithId = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
      video: newCourse.video,
      document: newCourse.document
    };
    ////////////new database code//////////////////
    try {

        const client = createClient({
          projectId: 'xsxj1ee7',
          dataset: 'production',
          useCdn: true, // set to `false` to bypass the edge cache
          apiVersion: '2021-10-21', // use current date (YYYY-MM-DD) to target the latest API version
          token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl" // Only if you want to update content with the client
          // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
        })
        const currentDateTime = new Date();
  
        const courseData = {
          _type: "topic",
          topicID: currentDateTime+"topic ID-"+courseCapturedData.courseID,
          courseID: courseCapturedData.courseID,
          title: newCourse.title,
          description: newCourse.description,
          video: newCourse.video,
          document: newCourse.document    
          
        };
  
        async function getCourses() {
          try {
            const courses = await client.fetch(`*[_type == "topic"]`);
            return courses;
          } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
          }
        }
  
        async function createCourse(courseData) {
          try {
            const result = await client.create(courseData);
            console.log('Topic created successfully:', result);
            // const notification = "Account created successfully, Login to your account";
            window.location.reload();
            // navigation.navigate('UserPage', { screen: 'UserPage' });
            return result;
            
          } catch (error) {
            console.error('Error creating topic:', error);
            console.log(client.config())
            throw error;
          }
        }
  
        // Use await or handle promises properly
        const courses = await getCourses();
        const createdCourse = await createCourse(courseData);
  
        // Continue with the rest of your code, if needed
      } catch (error) {
        console.error('Error:', error);
      }


    setCourses([...courses, newCourseWithId]);
    setCreateModalOpen(false);
    setNewCourse({ title: '', description: '' });
  };
  const handleOpenCourseClick = (course) => {
    // Navigate to the topics page or any other appropriate page
    
    navigate('/LecturerInnerCourses');
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="TrainerHome">
       {/* Navbar */}
       <div className={`navbar ${isNavOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link to="/"><i className="fa fa-home"></i> Home</Link>
            <Link to="/BrowseCourses"><i className="fa fa-university"></i> Browse Programs</Link>
            <Link to="/LoginPage"><i className="fa fa-sign-in"></i> Login</Link>
          </div>
        <div className="toggle-nav" onClick={() => setIsNavOpen(!isNavOpen)}>
          <i style={{ color: "white"}} className={`fa ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
      <br /><br /><br /><br />
    <div className="announcements-section">
    <h4>Assignments</h4>
  {assignments.length > 0 ? (
    assignments.map((assignment) => (
      <div key={assignment.assignmentID} className="announcement-card">
        <p>{assignment.description}</p>
        <a href={assignment.assignmentlink} download target="_blank" rel="noopener noreferrer">
              <button className="download-button">Download Assignment</button>
        </a>

      </div>
    ))
  ) : (
    <p>You do not have any assignments.</p>
  )}
    </div>
        {/* Announcements section */}
    <div className="announcements-section">
    <h4>Announcements</h4>
  {announcements.length > 0 ? (
    announcements.map((announcement) => (
      <div key={announcement.announcementID} className="announcement-card">
        <h5>{announcement.title}</h5>
        <p>{announcement.description}</p>

       
      </div>
    ))
  ) : (
    <p>You do not have any announcements.</p>
  )}
    </div>
      <h2>Your Topics</h2>
     
      <div className="course-list" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jubileeUni/landingBanner.png)`, backgroundAttachment: 'fixed' }}>
  {courses.length > 0 ? (
    courses.map((course) => (
      <div key={course.id} className="course-card">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        {/* Use an embedded YouTube player with responsive dimensions */}
        <div className="video-container">
          <iframe
            title={`Video for ${course.title}`}
            src={`https://www.youtube.com/embed/${course.video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Download button for the document */}
        <a href={course.document} download target="_blank" rel="noopener noreferrer">
          <button className="download-button">Download The Notes</button>
        </a>
      </div>
    ))
  ) : (
    <p>You do not have any Topics yet. Click on Create Content to create a topic</p>
  )}
</div>

     

      
      {isEditModalOpen && (
        <CourseModal
          course={selectedCourse}
          onSaveChanges={handleSaveChanges}
          onClose={handleModalClose}
        />
      )}

      {isCreateModalOpen && (
        <CreateCourseModal
          newCourse={newCourse}
          onInputChange={setNewCourse}
          onSave={handleCreateCourse}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

function CourseModal({ course, onSaveChanges, onClose }) {
    const [updatedCourse, setUpdatedCourse] = useState({ ...course });

    const handleInputChange = event => {
      const { name, value } = event.target;
      setUpdatedCourse(prevCourse => ({
        ...prevCourse,
        [name]: value,
      }));
    };
  
    const handleSave = () => {
      onSaveChanges(updatedCourse);
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Edit Course</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={updatedCourse.title}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={updatedCourse.description}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
}

function CreateCourseModal({ newCourse, onInputChange, onSave, onClose }) {
  const handleSave = () => {
    onSave();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Content</h2>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newCourse.title}
          onChange={e => onInputChange({ ...newCourse, title: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={newCourse.description}
          onChange={e => onInputChange({ ...newCourse, description: e.target.value })}
          rows="4" // Adjust the number of rows as needed
          cols="50" // Adjust the number of columns as needed
          style={{ width: '100%' }}
        />
       
        {/* Link to open the specified address in a new window */}
        <a
            href="https://studio.youtube.com/channel/"
            target="_blank"
            rel="noopener noreferrer"
        >
        Upload Video Here
        </a>
        
         <input
          type="text"
          name="video"
          placeholder='Enter Youtube video link here'
          value={newCourse.video}
          onChange={(e) => {
            // Remove "https://youtu.be/" from the input value
            const cleanedValue = e.target.value.replace("https://youtu.be/", "");
            // Update the state with the cleaned value
            onInputChange({ ...newCourse, video: cleanedValue });
          }}
        />
       {/* Link to open the specified address in a new window */}
       <a
            href="https://drive.google.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
        Upload Document Here
        </a>
        <input
          type="text"
          name="document"
          value={newCourse.document}
          placeholder='Enter Document link here'
          onChange={e => onInputChange({ ...newCourse, document: e.target.value })}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save Course</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default LecturerInnerCourses;
