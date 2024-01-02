import React, { useState, useEffect } from 'react';
import './TrainerHome.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@sanity/client';



function StudentHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const selectedYear = location.state?.selectedYear;
  console.log("user data located!!!");
  console.log(userData);
  console.log("selected year found!!!");
  console.log(selectedYear);
  // const [cardsData, setCardsData] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [courses, setCourses] = useState([
  //   { id: 1, title: 'Course 1', description: 'Description for Course 1' },
  //   { id: 2, title: 'Course 2', description: 'Description for Course 2' },
  //   { id: 3, title: 'Course 3', description: 'Description for Course 3' },
  // ]);
  let PROJECT_ID = "xsxj1ee7";
  let DATASET = "production";
  let QUERY = encodeURIComponent(`*[_type == "course" && year == "${selectedYear}"]`);

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



  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  const handleEditClick = course => {
    setSelectedCourse(course);
    setEditModalOpen(true);
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
    // Create a new course and add it to the courses state
    const newCourseWithId = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
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
      const yearSelected = document.getElementById('selectedYear').value;
      const programSelected = document.getElementById('selectedProgram').value;
      console.log("value selected on year : ");
      console.log(yearSelected);


      const courseData = {
        _type: "course",
        courseID: currentDateTime+"course lecturer-"+userData.lecturerID,
        courseName: newCourse.title,
        description: newCourse.description,
        lecturerID: userData.lecturerID,
        lecturerName: userData.name,
        programID: programSelected,
        year: yearSelected
        
      };

      async function getCourses() {
        try {
          const courses = await client.fetch(`*[_type == "course" && lecturerID == "${userData.lecturerID}"]`);
          return courses;
        } catch (error) {
          console.error('Error fetching courses:', error);
          throw error;
        }
      }

      async function createCourse(courseData) {
        try {
          const result = await client.create(courseData);
          console.log('Course created successfully:', result);
          // const notification = "Account created successfully, Login to your account";
          window.location.reload();
          // navigation.navigate('UserPage', { screen: 'UserPage' });
          return result;
          
        } catch (error) {
          console.error('Error creating course:', error);
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
    
    navigate('/StudentInnerCourses', { state: { course } });
  };

  return (
    <div className="TrainerHome">
      <div className="navbar">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/BrowseCourses">Browse Programs</Link>
            {/* <Link to="/LoginPage">Login</Link> */}
            <Link to="/LoginPage">Logout</Link>
                        
             
          </div>  
        </div>
      <h2>Your Courses</h2>
      {/* <div className="">
        <button className="rounded-button" onClick={handleCreateClick}>Create Course</button>

      </div> */}
      <div className="course-list">
        {courses.map(course => (
          <div key={course.courseID} className="course-card">
            <h3>{course.courseName}</h3>
            <p><span class="fa fa-calendar"></span> {course.year}</p>
            <p><strong>Description:</strong> {course.description}</p>
           
            <div className="course-actions">
              {/* <button onClick={() => handleEditClick(course)}>Edit</button> */}
             
              <button onClick={() => handleOpenCourseClick(course)}>Open Course</button>
              <button >View Announcements</button>
              <button >Download Assignments</button>
            </div>
          </div>
        ))}
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
        <h2>Create New Course</h2>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newCourse.title}
          onChange={e => onInputChange({ ...newCourse, title: e.target.value })}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newCourse.description}
          onChange={e => onInputChange({ ...newCourse, description: e.target.value })}
        />
         <label>Select Program:</label>
              <select id="selectedProgram">
                <option value="PSM">BSc in Public Sector Management</option>
                <option value="BBA">BCom in Business administration</option>
                <option value="HRM">Bcom in Human Resource Management</option>
                <option value="BAF">BCom in Accounting & Finance</option>
                <option value="PAF">BCom in Public Accounting & Finance</option>
                <option value="PSCM">BSc in Procurement & Supply Chain Management</option>
                <option value="SCTP">Short Course Training Program</option>
              </select>
         {/* New select element with options */}
              <label>Select Year:</label>
              <select id="selectedYear">
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
              {/* End of new select element */}
        <div className="modal-buttons">
          <button onClick={handleSave}>Save Course</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
