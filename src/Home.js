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
          <Link to="/">Home</Link>
          <Link to="/BrowseCourses">Browse Programs</Link>
          <Link to="/LoginPage">Login</Link>
        </div>
      </div>
<center>
      {/* Header Section */}
      
      <header className="Home-header"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/jubileeUni/_MG_1242.JPG)` }}>
        <div className="header-content">
          <center>
          
        <div style={{ padding: '15px;',width: '30%', marginTop: '400px', backgroundColor: 'white', borderRadius: '20px' }}>
        {/* <img style= {{ width: '70px' }} src={process.env.PUBLIC_URL + '/jubileeUni/logo_gif.gif'} alt="logo" /> */}
          <h5 style={{color: 'white', margin: '0px', backgroundColor: 'rgb(179, 117, 37)'}}>Jubilee University E-Learning</h5>
          <p>Unlock Your Potential with Unlimited Knowledge</p>
      </div>
      </center>
         
          

          {/* Call-to-Action Buttons */}
          <div className="cta-buttons">
            <Link to="/BrowseCourses" className="cta-button" >Browse Programs</Link>
            <Link to="/LoginPage" className="cta-button">Login</Link>
          </div>
        </div>
      </header>
</center>

      {/* Reels Section (Facebook-like Reels) */}
      <section className="reels-section">
        <h2>Explore the Jubilee Experience</h2>
        {/* Add your reels or interesting content here */}
        <div className="reel-container">
          {/* Reel 1 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/DSC_1383.JPG'} alt="Reel 1" />
            <p>Discover Our Campus Life</p>
          </div>
          {/* Reel 2 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/_MG_1172.JPG'} alt="Reel 2" />
            <p>Exciting Events and Activities</p>
          </div>
          {/* Reel 3 */}
          <div className="reel">
            <img src={process.env.PUBLIC_URL + '/jubileeUni/_MG_1229.JPG'} alt="Reel 3" />
            <p>Meet Our Outstanding Faculty</p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section" >
        <h2>Latest Articles</h2>
        {/* Example Article 1 */}
        <div className="article" style={{ boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.1)', borderRadius: '7px' }}>
          <img src={process.env.PUBLIC_URL + '/jubileeUni/DSC_1370.JPG'} alt="Article 1" />
          <div className="article-content">
            <h3>Embracing Innovation in Education</h3>
            <p>Discover how Jubilee University is leading the way in innovative teaching methods...</p>
            <Link to="/article1" className="read-more-link">Read More</Link>
          </div>
        </div>
        {/* Example Article 2 */}
        <div className="article" style={{ boxShadow: '8px 8px 8px 8px rgba(0, 0, 0, 0.1)', borderRadius: '7px' }}>
          <img src={process.env.PUBLIC_URL + '/jubileeUni/DSC_1378.JPG'} alt="Article 2" />
          <div className="article-content">
            <h3>The Future of Learning: Online Education Trends</h3>
            <p>Explore the latest trends shaping the future of online education...</p>
            <Link to="/article2" className="read-more-link">Read More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
