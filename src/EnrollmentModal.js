// EnrollmentModal.js
import React, { useState } from 'react';

const EnrollmentModal = ({ isOpen, onClose, onEnroll }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleEnroll = () => {
    // Call the function to handle enrollment with registrationNumber and password
    onEnroll(registrationNumber, password);
    // Close the modal
    onClose();
  };

  return (
    <div className={`enrollment-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Enrollment</h2>
        <label>Registration Number:</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleEnroll}>Enroll</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
