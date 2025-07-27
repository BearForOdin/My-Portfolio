import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Selasi Dzeamesi </span>
            from <span className="purple"> Accra, Ghana.</span>
            <br />
            I am currently a freelance Software developer and I'm open to work on all projects and contributions. <span><a href="https://drive.google.com/file/d/1Lniwn4kZQCpL_uAMqVs6I5ZuekFeX4bf/view?usp=sharing" className="purple">Click here to know me!</a></span>
            <br />
            I have a strong passion for creativity and I channel it into my code.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Reading
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Photography and Art
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Code. Commit. Everyday."{" "}
          </p>
          <footer className="blockquote-footer">Selasi</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
