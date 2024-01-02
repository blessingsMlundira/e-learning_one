import React, { useState } from 'react';
import { BrowserRouter as useNavigate } from 'react-router-dom';

import './BecomeTrainer.css';
import {createClient} from '@sanity/client';



function BecomeTrainer() {
  const navigate = useNavigate();
  // Use state to manage form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    phonenumber: '',
    username: '',
    password: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access the form data in the formData object
    console.log('Form Data:', formData);
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
    console.log("displaying current date time");

    // console.log(currentDateTime+"lecturer account");
    console.log("displaying user data : ");
    console.log(formData.name);
    console.log(formData.email);
    console.log(formData.phonenumber);
    // Add your logic here to handle form submission, e.g., send data to server, etc.
    try {

      const client = createClient({
        projectId: 'xsxj1ee7',
        dataset: 'production',
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2021-10-21', // use current date (YYYY-MM-DD) to target the latest API version
        token: "skht0W9fpI08KAEDZ5arQCfzKh00dbhgTw8uydiDBWZpKPZohGpgZu2DXAIb7pKQyEacOLZuXxEqAfwF3MurwmelbBMiZES7enDhwYgdvuKlaiwqKZolJu0vfOY4v7GNkDNCYiXgPfgHIv6PjWMRm4Bsyro6JegNCRdk3djdNxFGTqEPbqCl" // Only if you want to update content with the client
        // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
      })

      const lecturerData = {
        _type: "lecturer",
        lecturerID: currentDateTime+"lecturer account",
        name: formData.name,
        phonenumber: formData.phonenumber,
        email: formData.email,
        expertise: formData.expertise,
        username: formData.username,
        password: formData.password
        
      };

      async function getLecturers() {
        try {
          const lecturers = await client.fetch('*[_type == "lecturer"]');
          return lecturers;
        } catch (error) {
          console.error('Error fetching lecturers:', error);
          throw error;
        }
      }

      async function createLecturer(lecturerData) {
        try {
          const result = await client.create(lecturerData);
          console.log('Lecturer account created successfully:', result);
          const notification = "Account created successfully, Login to your account";
          navigate('/LoginPage', { state: { notification: 'invalid credentials entered' } });
          // navigation.navigate('UserPage', { screen: 'UserPage' });
          return result;
          
        } catch (error) {
          console.error('Error creating lecturer account:', error);
          console.log(client.config())
          throw error;
        }
      }

      // Use await or handle promises properly
      const lecturers = await getLecturers();
      const createdLecturer = await createLecturer(lecturerData);

      // Continue with the rest of your code, if needed
    } catch (error) {
      console.error('Error:', error);
    }


  };
  return (
    
    <div className="BecomeTrainer">
      <center>
      <div className="login-container" style={{
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          width: '50%',
          alignContent: 'center',
          
      }}>
      <h2>Create a Lecturer Account</h2>
      <p>Share your expertise with others by creating and uploading your courses!</p>
      <form className="trainer-form" onSubmit={handleSubmit}>
        {/* Add form fields for trainer information (e.g., name, email, expertise) */}
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <label>Expertise:</label>
        <input type="text" name="expertise" value={formData.expertise} onChange={handleInputChange} required />
        <label>Phonenumber:</label>
        <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} required />
        <p>On login, you will be required to enter a username and password</p>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        
        <button type="submit">Submit</button>
      </form>
      </div>
      </center>
    </div>
    
    
  );
}

export default BecomeTrainer;
