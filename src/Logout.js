// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  
  const navigate = useNavigate();

//   localStorage.removeItem('token');
//   setShowDropdown(false);
  navigate('./LoginPage');
  
}

export default Logout;
