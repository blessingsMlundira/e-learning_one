import React, { useState, useEffect } from 'react';
import './BrowseCourses.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import EnrollmentModal from './EnrollmentModal'; // Adjust the path accordingly
import { useNavigate, useLocation } from 'react-router-dom';

function BrowseCourses() {
    const [announcements, setAnnouncements] = useState([]);
 
  
    const [courses, setCourses] = useState([]);
    let PROJECT_ID = "xsxj1ee7";
    let DATASET = "production";
    let QUERY = encodeURIComponent(`*[_type == "program"]`);
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


//   // Sample course data (you can fetch this from an API or database)
//   const courses = [
//     {
//       id: 1,
//       title: 'Program 1',
//       description: 'Description for Program 1',
//       duration: '14 weeks', // Example duration
//       instructor: 'Lecturer 1', // Example instructor name
//       price: 49.99, // Example price
//       isOpen: true, // Example enrollment status
//     },
//     {
//       id: 2,
//       title: 'Program 2',
//       description: 'Description for Program 2',
//       duration: '6 weeks',
//       instructor: 'Lecturer 2',
//       price: 79.99,
//       isOpen: false, // Example enrollment status (course is closed)
//     },
//     {
//       id: 3,
//       title: 'Program 3',
//       description: 'Description for Program 3',
//       duration: '3 weeks',
//       instructor: 'Lecturer 3',
//       price: 59.99,
//       isOpen: true,
//     },
//   ];
   // Sample data for the student's current program and announcements
   const currentProgram = {
    title: 'Your Current Program',
    description: 'Description for Your Current Program',
    duration: '12 weeks',
    price: 'k450,000',
  };

  


  let QUERY5 = encodeURIComponent(`*[_type == "programAnnouncement"]`);

  // Compose the URL for your project's endpoint and add the query
  let URL5 = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY5}`;
  useEffect(() => {
    // Fetch data from Sanity backend
    const fetchData5 = async () => {
      try {
        const response = await fetch(URL5); // Specify the dataset (e.g., /categories)
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

    fetchData5();
  }, []); // Empty dependency array to ensure the effect runs only once
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  
  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };
  
  const handleModalClose = () => {
    
    setCreateModalOpen(false);
  };
  const handleCreateCourse = async (selectedYear) => {
     
      console.log("value selected on year : ");
      console.log(selectedYear);
      // Pass the selectedYear to the handleSave function
    //   handleSave(selectedYear);
      
  };

  return (
    
    
    <div className="BrowseCourses">
      <div className="navbar">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/BrowseCourses">Browse Programs</Link>
            <Link to="/LoginPage">Login</Link>
            {/* <Link to="/LoginPage">Logout</Link> */}
                       
            {/* <Link to="/BecomeTrainer">Become a Trainer</Link> */}
          </div>  
        </div>
      
    {/* Browse Programs Section */}
    <div className="section">
      <h2>Browse Programs</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div style={{ backgroundColor: 'rgb(175, 58, 58)', padding: '3px', color: 'white', borderRadius: '6px' }}>
            
            <h3>{course.programName}</h3>
             
            </div>
            
            
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Fees:</strong> k{course.fees}</p>
            <center>
                <button className="rounded-button" onClick={handleCreateClick}>Open Program</button>
            
            </center>
            
          </div>
        ))}
      </div>
    </div>

    {/* Current Program Section
    <div className="section">
      <h2>{currentProgram.title}</h2>
      <div className="program-card" style={{ width: '100%' }} >
       
        <p style={{fontSize: 10}}>{currentProgram.description} | <strong>Duration:</strong> {currentProgram.duration} | <strong>Fees:</strong> {currentProgram.price}</p>
        
    
      </div>
    </div> */}

    {/* Announcements Section */}
    <div className="section announcements-section">
      <h2>Announcements</h2>
      {announcements.map(announcement => (
        <div key={announcement.announcementID} className="announcement-card">
           <div style={{
             color: 'white',
             backgroundColor: 'green',
             fontSize: '15px', // Adjust the size according to your preference
            //  padding: '0.2px', // Add padding for better appearance
             width: '5%',
             height: '2%',
             borderRadius: '5px'
            }}>
          <p style={{ color: 'white' }}>{announcement.programID}</p>
          </div>
          <h3>{announcement.title}</h3>
          <p>{announcement.description}</p>
        </div>
      ))}
    </div>
    {isCreateModalOpen && (
        <CreateCourseModal
         
          onSave={handleCreateCourse}
          onClose={handleModalClose}
        />
      )}
  </div>
  );
}
function CreateCourseModal({ onSave, onClose }) {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSave = async (selectedYear) => {
        console.log("you clicked on the deep end!!!");
        console.log("selected year value : ");
        console.log(selectedYear);
        try {
            let PROJECT_ID = "xsxj1ee7";
            let DATASET = "production";
            
                // Compose the URL for your project's endpoint and add the query
            let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${encodeURIComponent(
                `*[_type == "programEnrollment" && regNumber == "${registrationNumber}" && password == "${password}"]`
              )}`;
    
              // Fetch user details from Sanity.io
            const response = await fetch(URL);
            const data = await response.json();
      
            // Check if user exists
            if (data && data.result && data.result.length > 0) {
              // Navigate to the Home screen or any other screen on successful login
              // navigation.navigate('UserPage');
              const userData = data.result[0];
              // Navigate to the Home screen or any other screen on successful login
              // Pass the registrationNumber and password to the onSave function
                onSave({ registrationNumber, password, selectedYear });
                navigate('/StudentHome', { state: { selectedYear } });
            } else {
              // Display an error message or handle unsuccessful login
              console.error('Invalid credentials');
              // Simulating an error for demonstration purposes
              // setNotification("Invalid credentials");
              // navigation.replace('Login', { notification });
              navigate('/StudentHomepage');
      
          // navigation.navigate('LoginScreen');
            }
            
            
      
            
          } catch (error) {
            console.error('Error:', error);
          }

        
        // // Pass the registrationNumber and password to the onSave function
        // onSave({ registrationNumber, password, selectedYear });
        // navigate('/StudentHome', { state: { selectedYear } });
        
    };
    
  
    return (
      <div className="modal">
       <div className="modal-content">
        <h2>Enter your details to access the program</h2>
        
        
        {/* New fields for registration number and password */}
        <label>Registration Number:</label>
        <input
          type="text"
          name="registrationNumber"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* End of new fields */}
        <label>Select Year to open program:</label>
        <div className="modal-buttons">
           {/* New select element with options */}
        
              <select  id="selectedYear" onChange={(e) => handleSave(e.target.value)}>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
              {/* End of new select element */}
          <button style={{ width : '30%' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
      </div>
    );
  }

export default BrowseCourses;
