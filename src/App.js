// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Home';
import BrowseCourses from './BrowseCourses';
import BecomeTrainer from './BecomeTrainer';
import BecomeStudent from './BecomeStudent';
import StudentHomepage from './StudentHomepage';
import TrainerHome from './TrainerHome';
import Enrollment from './Enrollment';
import BrowseInnerCourses from './BrowseInnerCourses';
import LoginPage from './LoginPage';
import LecturerInnerCourses from './lecturerInnerCourses';

import StudentHome from './StudentHome';
import StudentInnerCourses from './StudentInnerCourses';




function App() {

  return (
    <Router>
      <div className="">

        <div className="App">
          <Routes>
            <Route path="/BrowseCourses" element={<BrowseCourses />} />
            <Route path="/BecomeTrainer" element={<BecomeTrainer />} />
            <Route path="/BecomeStudent" element={<BecomeStudent />} />
            <Route path="/StudentHomepage" element={<StudentHomepage />} />
            <Route path="/TrainerHome" element={<TrainerHome />} />
            <Route path="/Enrollment" element={<Enrollment />} />
            <Route path="/BrowseInnerCourses" element={<BrowseInnerCourses />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/LecturerInnerCourses" element={<LecturerInnerCourses />} />
            <Route path="/StudentHome" element={<StudentHome />} />
            <Route path="/StudentInnerCourses" element={<StudentInnerCourses />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
