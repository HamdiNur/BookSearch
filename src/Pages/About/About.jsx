import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container">

        <div className="section-title">
          <h2 className='aboutitle'>About This Project</h2>
        </div>

        <div className="about-content grid">

          <div className="about-img">
            <img src={aboutImg} alt="about" />
          </div>

          <div className="about-text">
            <h3>Book Finder App</h3>

            <p>
              This project is a simple React application that allows users to
              search for books using the Open Library API. It displays book
              information such as title, author, cover image, and publication
              details.
            </p>

            <p>
              The goal of this project is to practice React concepts like
              components, routing, context API, and API integration while
              building something useful and real-world.
            </p>

            <p>
              You can search for any book, view results, and click a book to
              see detailed information on a separate page.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;