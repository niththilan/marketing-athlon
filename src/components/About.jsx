import React from 'react';


const About = () => {
  const sections = [
    {
      id: 'vision',
      title: 'Our Vision',
      content: 'Revolutionizing sports facility booking by making it seamless and accessible for all.'
    },
    {
      id: 'team',
      title: 'Our Team',
      content: 'Passionate tech enthusiasts and sports lovers building a user-friendly booking platform.'
    },
    {
      id: 'commitment',
      title: 'Our Commitment',
      content: 'Ensuring top-notch service with verified facilities for the best experience.'
    }
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">What is <span className="hero-accent">ATHLON</span>?</h1>
          <p className="hero-description">
            Athlon is your ultimate sports facility booking platform, designed to bridge the gap between 
            sports enthusiasts and quality venues. We simplify the process of finding and booking sports 
            facilities, making it easier than ever to stay active and engaged in your favorite sports.
          </p>
        </div>
      </div>

      <div className="about-content">
        {sections.map((section) => (
          <div key={section.id} className="about-section">
            <div className="section-content">
              <div className="section-text">
                <h2 className="section-title">{section.title}</h2>
                <p className="section-description">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
     