import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
// import {createClient, Patch, Transaction} from '@sanity/client';

function Login() {
  const [accountType, setAccountType] = useState('student');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const notification = location.state?.notification;

  let PROJECT_ID = "xsxj1ee7";
  let DATASET = "production";


  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // Implement login logic here based on selected account type
    // Redirect users based on their account type after successful login
    console.log(`Logging in as ${accountType}`);

    // Redirect user based on their account type
    if (accountType === 'lecturer') {
        console.log("user details entered");
        console.log(username);
        console.log(password);
        try {
            if (accountType === 'lecturer') {
                console.log("user details entered: ");
                console.log(username);
                console.log(password);
                // Compose the URL for your project's endpoint and add the query
            let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${encodeURIComponent(
                `*[_type == "lecturer" && username == "${username}" && password == "${password}"]`
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
              navigate('/TrainerHome', { state: { userData } });
            } else {
              // Display an error message or handle unsuccessful login
              console.error('Invalid credentials');
              // Simulating an error for demonstration purposes
              // setNotification("Invalid credentials");
              // navigation.replace('Login', { notification });
              navigate('/LoginPage', { state: { notification: 'invalid credentials entered' } });
      
          // navigation.navigate('LoginScreen');
            }
            }
            
          } catch (error) {
            console.error('Error:', error);
          }
       
    } else {
        console.log("user details entered: ");
                console.log(username);
                console.log(password);
                // Compose the URL for your project's endpoint and add the query
            let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${encodeURIComponent(
                `*[_type == "student" && username == "${username}" && password == "${password}"]`
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
              navigate('/BrowseCourses', { state: { userData } });
            } else {
              // Display an error message or handle unsuccessful login
              console.error('Invalid credentials');
              // Simulating an error for demonstration purposes
              // setNotification("Invalid credentials");
              // navigation.replace('Login', { notification });
              navigate('/LoginPage', { state: { notification: 'invalid credentials entered' } });
      
          // navigation.navigate('LoginScreen');
            }
      navigate('/StudentHomePage');
    }
  };
  const handleSignup = () => {
    // Implement login logic here based on selected account type
    // Redirect users based on their account type after successful login
    // console.log('user signing in');

    // Redirect user based on their account type
    if (accountType === 'lecturer') {
      navigate('/BecomeTrainer');
    } else {
    //   navigate('/BrowseCourses');
    navigate('/BecomeStudent');
    }

    ///////////////////////////new code //////////////////////////////////
    
  };
  

  return (
    <div className="Login" >
      <header className="Login-header">
        <div className="login-form">
          <h1>Login</h1>

          {notification && (
            <div className="notification" style={{ color: 'red', marginTop: '10px' }}>
              {notification}
            </div>
          )}

          <label>
            Select Account Type:
            <select value={accountType} onChange={(e) => handleAccountTypeChange(e.target.value)}>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
            </select>
          </label>
          <label>Username:</label>
          <input type="text" placeholder='Username' name="username" value={username} onChange={handleUsernameChange} required />
          <label>Password:</label>
          <input type="password" placeholder='Password' name="password" value={password} onChange={handlePasswordChange} required />
            
          <button onClick={handleLogin}>Login</button>
            <div className='textContainer'>
                <p >Don't have an account? </p>
                <p style={{ fontSize: '10px', color: 'green' }}>select account type above and and click on Sign up below</p>
            </div>
            
            <button onClick={handleSignup}>Sign up</button>
          
        </div>
      </header>
    </div>
  );
}

export default Login;
