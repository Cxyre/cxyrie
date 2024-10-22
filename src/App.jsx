import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; // Assuming you have a file for styles

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalImage, setModalImage] = useState(null); // State to store the clicked image
  const [isClosing, setIsClosing] = useState(false);  // New state to manage modal fade-out

  // State to capture form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const sectionsRef = useRef({});

  // Function to handle scrolling to a specific section
  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    const sectionElement = document.getElementById(sectionId);
    sectionElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
  };

  // Modal open/close functions
  const openModal = (imageSrc) => {
    setIsClosing(false);  // Ensure it's not in closing state
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setIsClosing(true);  // Trigger closing animation
    setTimeout(() => {
      setModalImage(null); // Remove modal after the transition
    }, 500);  // Match the duration of the CSS transition
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    // Here you can handle sending the data to a server or email service
    console.log('Form Data Submitted:', formData);

    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    alert('Message sent!');
  };

  // Function to observe section visibility using IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Set active section when it enters view
        }
      });
    }, options);

    // Add sections to the observer
    const sectionIds = ['home', 'about', 'portfolio', 'contact'];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
        sectionsRef.current[id] = section;
      }
    });

    return () => {
      // Cleanup observer on unmount
      sectionIds.forEach((id) => {
        const section = sectionsRef.current[id];
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <img src="/image/pc.jpg" alt="Profile" className="profile-image" />
          <h2>Cxyre Jason D. Pioquinto</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a
                className={activeSection === 'home' ? 'active' : ''}
                href="#home"
                onClick={() => showSection('home')}
              >
                <i className="icon-home"></i> Home
              </a>
            </li>
            <li>
              <a
                className={activeSection === 'about' ? 'active' : ''}
                href="#about"
                onClick={() => showSection('about')}
              >
                <i className="icon-about"></i> About
              </a>
            </li>
            <li>
              <a
                className={activeSection === 'portfolio' ? 'active' : ''}
                href="#portfolio"
                onClick={() => showSection('portfolio')}
              >
                <i className="icon-portfolio"></i> Portfolio
              </a>
            </li>
            <li>
              <a
                className={activeSection === 'contact' ? 'active' : ''}
                href="#contact"
                onClick={() => showSection('contact')}
              >
                <i className="icon-contact"></i> Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Social icons */}
        <div className="social-icons">
          <a
            href="https://www.facebook.com/cxyrejasondiaz.pioquinto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/image/facebook.png" alt="Facebook" className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/cxyree/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/image/insta.png" alt="Instagram" className="social-icon" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className={`hero ${activeSection === 'home' ? 'active' : ''}`}>
          <div className="scrollable-content">
            <h1 className="hero-title">Welcome to My Portfolio</h1>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`about ${activeSection === 'about' ? 'active' : ''}`}>
          <h2 className="about-title">About Me</h2>
          <div className="about-container">
            <div className="about-image">
              <img src="/image/z.png" alt="Profile" />
            </div>
            <div className="about-info">
              <h3>BSIT Student & Web Developer</h3>
              <p>
              As a 21-year-old 3rd-year Bachelor of Science in Information Technology (BSIT) student, 
                I’m passionate about technology and programming, especially in web development. This 
                portfolio reflects my dedication to learning and growth in areas like programming,
                web development, and IT solutions. I enjoy building applications that solve real-world
                problems and make a difference in people's lives. My hands-on experience spans 
                front-end and back-end development, and I am constantly exploring new technologies 
                to expand my skill set.
              </p>
              <ul>
                <li><i className="icon-birthday"></i><span>Birthday:</span> December 24, 2002.</li>
                <li><i className="icon-email"></i><span>Age:</span> 21</li>
                <li><i className="icon-location"></i><span>Address:</span> Brgy. Griño Tacurong City Sultan Kudarat.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className={`portfolio ${activeSection === 'portfolio' ? 'active' : ''}`}>
          <h2>My Portfolio:</h2>
          
          <div className="portfolio-gallery">
            <div className="portfolio-item">
              <img src="/image/a.png" alt="Project 1" onClick={() => openModal('/image/a.png')} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`contact ${activeSection === 'contact' ? 'active' : ''}`}>
          <h2>Contact Me</h2>
          <div className="contact-boxes">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Address: Brgy. Griño Tacurong City Sultan Kudarat.</p>
              <p>Email: cxyrejason.pioquinto1224@gmail.com</p>
              <p>Contact Number: 09663916035 (Globe)</p>
            </div>
            <div className="contact-form">
              <h3>Email Us</h3>
              {/* Update form to capture input values */}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for Image Viewing */}
      {modalImage && (
        <div className={`modal ${isClosing ? 'hide' : 'show'}`} onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default App;
