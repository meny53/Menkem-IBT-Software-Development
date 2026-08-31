import profileImg from '../assets/Profile.jpg'

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        
        {/* Section Heading */}
        <div className="section-header">
          <span className="badge">Get to Know Me</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        {/* Main Content Layout */}
        <div className="about-grid">
          
          {/* Left Side: Profile Image */}
          <div className="about-image-wrapper">
            <div className="image-card">
              <img src={profileImg} alt="Profile" className="about-image" />
            </div>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Right Side: Bio & Details */}
          <div className="about-content">
            <h3 className="about-headline">
              Passionate Frontend Developer Creating Sleek Web Experiences
            </h3>

            <p className="about-text">
              Hello! I am a passionate frontend web developer eager to create clean, responsive, and user-friendly web interfaces. I love learning modern frontend technologies and turning creative designs into real websites.
            </p>

            <p className="about-text">
              My core focus is on <strong>React</strong>, <strong>JavaScript</strong>, <strong>HTML5</strong>, and <strong>CSS3</strong>. As a motivated developer, I am excited to collaborate on projects, build my portfolio, and continue growing my web development skills.
            </p>

            {/* Info Cards (Education & Focus) */}
            <div className="highlights-grid">
              <div className="highlight-card">
                <h4 className="highlight-title">Education</h4>
                <p className="highlight-value">B.Sc. in Engineering</p>
                <span className="highlight-desc">Software & Web Technologies</span>
              </div>

              <div className="highlight-card">
                <h4 className="highlight-title">Focus</h4>
                <p className="highlight-value">Frontend Development</p>
                <span className="highlight-desc">React, JavaScript & Modern CSS</span>
              </div>
            </div>

            {/* Frontend Skills & Strengths Tags */}
            <div className="passions-container">
              <h4 className="passions-title">What I Bring to the Table:</h4>
              <div className="passions-list">
                <span className="passion-pill">React.js</span>
                <span className="passion-pill">JavaScript (ES6+)</span>
                <span className="passion-pill">HTML5 & CSS3</span>
                <span className="passion-pill">Responsive Design</span>
                <span className="passion-pill">Git & GitHub</span>
                <span className="passion-pill">Eager Learner</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="about-actions">
              <a href="#contact" className="btn btn-primary">
                Contact Me
              </a>
              <a href="#projects" className="btn btn-secondary">
                View Projects
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About
