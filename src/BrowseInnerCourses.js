import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './BrowseCourses.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function BrowseInnerCourses() {
  // Sample course data (you can fetch this from an API or database)
  const courses = [
    {
      id: 1,
      title: 'Topic 1',
      description: 'Description for Topic 1',
      isOpen: true, // Example enrollment status
      video: 'g8059-8QDNk', // Placeholder YouTube video ID
      document: 'https://docs.google.com/presentation/d/1EqGa_JPS0P6QtX53DNlqyCZi3wYvVECiQ0mrOaR9EqI/edit?usp=drive_link'
    },
    {
      id: 2,
      title: 'Topic 2',
      description: 'Description for Topic 2',
      isOpen: false, // Example enrollment status (course is closed)
      video: 'g8059-8QDNk', // Placeholder YouTube video ID
      document: 'https://docs.google.com/presentation/d/1EqGa_JPS0P6QtX53DNlqyCZi3wYvVECiQ0mrOaR9EqI/edit?usp=drive_link'
    },
    {
      id: 3,
      title: 'Topic 3',
      description: 'Description for Topic 3',
      isOpen: true,
      video: 'g8059-8QDNk', // Placeholder YouTube video ID
      document: 'https://docs.google.com/presentation/d/1EqGa_JPS0P6QtX53DNlqyCZi3wYvVECiQ0mrOaR9EqI/edit?usp=drive_link'
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlayVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="BrowseCourses">
      <h2>Learning Content</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {/* Use an embedded YouTube player with responsive dimensions */}
            <div className="video-container">
              <iframe
                title={`Video for ${course.title}`}
                src={`https://www.youtube.com/embed/${course.video}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* Download button for the document */}
            <a href={course.document} download target="_blank" rel="noopener noreferrer">
              <button className="download-button">Download The Notes</button>
            </a>
          </div>
        ))}
      </div>

      {/* Removed the dedicated video player div */}
    </div>
  );
}

export default BrowseInnerCourses;
