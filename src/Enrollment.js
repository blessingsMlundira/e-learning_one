import React from 'react';
import './Enrollment.css';

function Enrollment() {
  // Simulated course details; you can retrieve these from the backend/API
  const courseDetails = {
    title: 'Course Title',
    description: 'Description of the course goes here. This is a brief overview of what students will learn.',
    instructor: {
      name: 'Instructor Name',
      bio: 'Brief bio of the instructor. Mention the instructor\'s qualifications and experience.',
    },
    schedule: 'Course Schedule: Mondays and Wednesdays, 6:00 PM - 8:00 PM',
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Handle form submission logic here (e.g., sending data to the backend)
    // Access entered data using formRef.current elements (e.g., formRef.current.name.value)
  };

  return (
    <div className="Enrollment">
      <h2>Enroll in Course</h2>
      <div className="course-details">
        <h3>{courseDetails.title}</h3>
        <p>{courseDetails.description}</p>
        <h4>Instructor: {courseDetails.instructor.name}</h4>
        <p>{courseDetails.instructor.bio}</p>
        <p>{courseDetails.schedule}</p>
      </div>
      <form className="enrollment-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" required />
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Payment Details:</label>
        <input type="text" name="paymentDetails" required />
        <button type="submit">Complete Enrollment</button>
      </form>
    </div>
  );
}

export default Enrollment;
