import React, { useState, useEffect } from 'react';
import './TrainerHome.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@sanity/client';



function TrainerHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  console.log("user data located!!!");
  console.log(userData);
  // const [cardsData, setCardsData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  // const [courses, setCourses] = useState([
  //   { id: 1, title: 'Course 1', description: 'Description for Course 1' },
  //   { id: 2, title: 'Course 2', description: 'Description for Course 2' },
  //   { id: 3, title: 'Course 3', description: 'Description for Course 3' },
  // ]);
  let PROJECT_ID = "xsxj1ee7";
  let DATASET = "production";
  let QUERY = encodeURIComponent(`*[_type == "course" && lecturerID == "${userData.lecturerID}"]`);

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
  }, [reloadTrigger]); // Empty dependency array to ensure the effect runs only once



  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [isCreateAnnouncementModalOpen, setCreateAnnouncementModalOpen] = useState(false);
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentLink, setAssignmentLink] = useState('');
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const handleUploadAssignmentClick = (course) => {
    setSelectedCourse(course);
    setUploadModalOpen(true);
  };
  const handleDeleteClick = async (courseID) => {
    try {
      const client = createClient({
        projectId: 'xsxj1ee7',
        dataset: 'production',
        useCdn: true,
        apiVersion: '2021-10-21',
        token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl", // Only if you want to update content with the client
        ignoreBrowserTokenWarning: true
      });

      // Use the client to delete the course based on the courseID
      await client
        .delete({query: `*[_type == "course" && courseID== "${courseID}"]`})
        .then(() => {
          console.log('Course deleted successfully');
          // Optionally, you can update the state or fetch courses again to reflect the deletion
          setCourses((prevCourses) => prevCourses.filter((course) => course.courseID !== courseID));
          // or refetch courses
          // fetchData();
        })
        .catch((err) => {
          console.error('Deletion failed:', err.message);
          
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveAssignment = async (description, link) => {
    // Perform logic to save the assignment
    console.log('Assignment Description:', description);
    console.log('Assignment Link:', link);
    console.log('Selected course :', selectedCourse.courseID);

    // Add logic to save the assignment to Sanity or any other backend
    // try {

      const client = createClient({
        projectId: 'xsxj1ee7',
        dataset: 'production',
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2021-10-21', // use current date (YYYY-MM-DD) to target the latest API version
        token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl" // Only if you want to update content with the client
        // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
      })
      const currentDateTime = new Date();
    


      const assignmentData = {
        _type: "courseAssignment",
        assignmentID: currentDateTime+"course lecturer-",
        description: description,
        assignmentlink:link,
        courseID: selectedCourse.courseID
        
      };
      client
    .create(assignmentData)
    .then(() => {
        console.log('assignment created');
        // window.location.reload();
        // Trigger a reload after saving
        setReloadTrigger(prevState => !prevState);
    
    })
    .catch((err) => {
        console.error('creation failed: ', err.message)
    })

      
      // async function createAssignment(assignmentData) {
      //   try {
      //     const result = await client.create(assignmentData);
      //     console.log('Assignment created successfully:', result);
      //     // const notification = "Account created successfully, Login to your account";
      //     window.location.reload();
      //     // navigation.navigate('UserPage', { screen: 'UserPage' });
      //     return result;
          
      //   } catch (error) {
      //     console.error('Error creating course:', error);
      //     console.log(client.config())
      //     throw error;
      //   }
      // }

     
      // const createdAssignment = await createAssignment(assignmentData);

      

      

      
        
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    //end of the logic
  };

  const handleEditClick = course => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };
  const handleCreateAnnouncementClick = (course) => {
    setSelectedCourse(course);
    
    setCreateAnnouncementModalOpen(true);
  };
  const handleCreateAnnouncementModalClose = () => {
    setCreateAnnouncementModalOpen(false);
  };
  const handleSaveAnnouncement = async () => {
    // Perform logic to save the announcement, you can use the announcementContent state
    console.log("course selected!!!!");
    console.log(selectedCourse.courseID);
    console.log("displaying annoucement title : ");
    console.log(announcementTitle);
    console.log("displaying announcement detail : ");
    console.log(announcementContent);
    let PROJECT_ID = "xsxj1ee7";
    let DATASET = "production";
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
      
      


      const announcementData = {
        _type: "courseAnnouncement",
        announcementID: currentDateTime+"courseAnnouncement lecturer-"+userData.lecturerID,
        title: announcementTitle,
        description: announcementContent,
        courseID: selectedCourse.courseID,
        
      };

      

      async function createCourse(announcementData) {
        try {
          const result = await client.create(announcementData);
          console.log('announcemenent created successfully:', result);
          // const notification = "Account created successfully, Login to your account";
          // window.location.reload();
          // navigation.navigate('UserPage', { screen: 'UserPage' });
          setReloadTrigger(prevState => !prevState);
          return result;
          
        } catch (error) {
          console.error('Error creating announcement:', error);
          console.log(client.config())
          throw error;
        }
      }

      // Use await or handle promises properly
     
      const createdCourse = await createCourse(announcementData);

      // Continue with the rest of your code, if needed
    } catch (error) {
      console.error('Error:', error);
    }


    // Close the modal after saving

    handleCreateAnnouncementModalClose();
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
          // window.location.reload();
          // navigation.navigate('UserPage', { screen: 'UserPage' });
          // Update the state with the new course
          // setCourses(prevCourses => [...prevCourses, result]);
           // Update the state with the new course
          // setCourses(prevCourses => [...prevCourses, result]);
          setReloadTrigger(prevState => !prevState);

          // Close the modal or perform any other necessary actions
          setCreateModalOpen(false);
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
    
    navigate('/LecturerInnerCourses', { state: { course } });
  };

  return (
    <div className="TrainerHome">
       <div className="navbar">
          <div className="nav-links">
            <Link to="/"><i class="fa fa-home"></i> Home</Link>
            <Link to="/BrowseCourses"><i class="fa fa-university"></i> Browse Programs</Link>
            {/* <Link to="/LoginPage">Login</Link> */}
            <Link to="/LoginPage"><i class="fa fa-sign-out"></i> Logout</Link>
                        
             {/* <Link to="/BecomeTrainer">Become a Trainer</Link> */}
          </div>  
        </div>
      
      <div style={{ padding: '5px', backgroundColor: 'white'}}>
        <h2><span class="fa fa-graduation-cap"></span> Your Courses</h2>
      </div>
      <br />
      <div className="">
        <button className="rounded-button" onClick={handleCreateClick}><i className='fa fa-plus'></i> Create Course</button>

      </div>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.courseID} className="course-card">
            <h3>{course.courseName}</h3>
            <p><span class="fa fa-calendar"></span> {course.year}</p>
            <p><strong>Description:</strong> {course.description}</p>
            {/* <input
              type="text"
              
              value={course.courseID}
              /> */}
            <div className="course-actions">
              {/* <button onClick={() => handleEditClick(course)}>Edit</button> */}
              <button onClick={() => handleDeleteClick(course.courseID)}>Delete</button>
              <button onClick={() => handleOpenCourseClick(course)}>Open Course</button>
              <button onClick={() => handleCreateAnnouncementClick(course)}>Create Announcement</button> 
              <button onClick={() => handleUploadAssignmentClick(course)}>Upload Assignment</button>
            </div>
          </div>
        ))}
      </div>
      {isCreateAnnouncementModalOpen && (
      <CreateAnnouncementModal
        title={announcementTitle}
        description={announcementContent}
        onTitleChange={setAnnouncementTitle}
        onDescriptionChange={setAnnouncementContent}
        onSave={handleSaveAnnouncement}
        onClose={handleCreateAnnouncementModalClose}
      />
    )}
    {isUploadModalOpen && (
        <UploadAssignmentModal
          onSave={handleSaveAssignment}
          onClose={() => setUploadModalOpen(false)}
          selectedCourse={selectedCourse} // Pass selectedCourse as a prop
        />
      )}


     

      
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
function CreateAnnouncementModal({ title, description, onTitleChange, onDescriptionChange, onSave, onClose, courseID }) {
  const handleSave = () => {
    console.log("this is the announcement title: ");
    console.log(title);
    console.log("this is the announcement description: ");
    console.log(description);
    console.log("this is the courseID: ");
    console.log(courseID);
    onSave();
  };

  return (
    <div className="modal">
    <div className="modal-content">
      <h2>Create Announcement</h2>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <label>Description:</label>
      <textarea
      style={{width: '100%', borderRadius: '12px'}}
      rows={10}
        name="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <div className="modal-buttons">
        <button onClick={handleSave}>Save Announcement</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
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

function UploadAssignmentModal({ onSave, onClose, selectedCourse}) {
  
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentLink, setAssignmentLink] = useState('');

  const handleSave = () => {
    // Perform logic to save the assignment
    onSave(assignmentDescription, assignmentLink);
    // console.log("assignment uploaded : ");
    // console.log(assignmentDescription, assignmentLink, selectedCourse.courseID);

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload Assignment</h2>
        <label>Description:</label>
        <input
          type="text"
          name="assignmentDescription"
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
        />
        <label>Link:</label>
        <input
          type="text"
          name="assignmentLink"
          value={assignmentLink}
          onChange={(e) => setAssignmentLink(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Upload Assignment</button>
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
              <option value="MISlevel4">ABMA Information Systems Level 4 </option>
              <option value="CIT-215">Business Information Systems Year 2(ICT - 215)</option>
              <option value="SCTP">Short Course Training Program</option>
                <option value="PSM">BSc in Public Sector Management</option>
                <option value="BBA">BCom in Business administration</option>
                <option value="HRM">Bcom in Human Resource Management</option>
                <option value="BAF">BCom in Accounting & Finance</option>
                <option value="PAF">BCom in Public Accounting & Finance</option>
                <option value="PSCM">BSc in Procurement & Supply Chain Management</option>
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

export default TrainerHome;
