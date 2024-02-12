import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  useEffect(() => {
    // Trigger the fade-in effect for the header after the component mounts
    const header = document.querySelector('.Home-header');
    header.classList.add('show');

    // Trigger the slide-up effect for each reel after a delay
    const reels = document.querySelectorAll('.reel');
    reels.forEach((reel, index) => {
      setTimeout(() => {
        reel.classList.add('show');
      }, index * 500); // Add a delay for each reel
    });
  }, []);
  return (
    <div className="Home">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-links">
          <Link to="/"><i class="fa fa-home"></i> Home</Link>
          <Link to="/BrowseCourses"><i class="fa fa-university"></i> Browse Programs</Link>
          <Link to="/LoginPage"><i class="fa fa-sign-in"></i> Login</Link>
        </div>
      </div>
      <br /><br /><br /><br /><br />
<center>
      {/* Header Section */}
      
      <header className="Home-header"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jubileeUni/landingBanner.png)`,height: '400px',width: '90%', boxShadow: '0 14px 6px rgba(0, 0, 0, 0.4)', paddingTop: '20px' }}>
        
        <div className="header-content" style={{  }}>
          
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)',padding: '5px', borderRadius: '20px', boxShadow: "inset 0 0 5px #000000" }}>
         
        <h1 style={{ backgroundColor: 'white', padding: '5px', borderRadius: '20px', borderBottom: "4px solid rgba(75, 92, 189, 1)" }}>
  
  <br />
  <span style={{ color: 'orange', display: 'inline-block' }}>
    {`Skill`}
  </span>
  <span style={{ color: 'green', display: 'inline-block' }}>
    {`Space`}
  </span>
  <br />
  {`Unlock Your Full Potential`}
</h1>
          

<p style={{ color: 'white' }}>At SkillSpace, we believe that your potential knows no bounds. Our platform is not just an E-Learning app; it's your gateway to unlocking a world of possibilities and reaching new heights in your personal and professional journey.</p>
          </div>
         
         <br /> 

          {/* Call-to-Action Buttons */}
          <div className="cta-buttons">
            <Link to="/BrowseCourses" className="cta-button" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}><i class="fa fa-university"></i> Browse Programs</Link>
            <Link to="/LoginPage" className="cta-button" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i class="fa fa-sign-in"></i> Login</Link>
          </div>
        </div>
      </header>
      
</center>


      {/* Reels Section (Facebook-like Reels) */}
      <section className="reels-section">
        <h2>Why SkillSpace?</h2>
        {/* Add your reels or interesting content here */}
        <div className="reel-container">
          {/* Reel 1 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/DSC_1383.JPG'} alt="Reel 1" />
            <p>Complete Learning Experience</p>
          </div>
          {/* Reel 2 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/_MG_1172.JPG'} alt="Reel 2" />
            <p>Flexible Learning, Anytime, Anywhere</p>
          </div>
          {/* Reel 3 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/_MG_1229.JPG'} alt="Reel 3" />
            <p>Expertly Crafted Courses</p>
          </div>
        </div>
      </section>

      
      

    </div>
  );
}

export default Home;
