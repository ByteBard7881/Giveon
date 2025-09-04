import React, { useState } from "react";
import "./Home.css";
import kids from "../assets/kids.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPiedPiperHat,
  faRebel,
  faKickstarter,
  faWebAwesome,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Form from "../form/Form";

function Home() {
  const [showForm, setShowForm] = useState(false);

  function handleDonateClick() {
    setShowForm(true);
  }

  return (
    <div className="container">
      <div className="upper-container">
        <div className="nav-bar">
          <div className="logo">Giveon</div>
          <div className="contact">
            <Link className="contact-link" to="">
              Help me
            </Link>
            <Link className="contact-link" to="">
              About us
            </Link>
            <Link className="contact-link" to="">
              Donation
            </Link>
            <Link className="contact-link" to="">
              Contact us
            </Link>
          </div>
          <button className="donate-btn" onClick={handleDonateClick}>
            Donate
          </button>
        </div>

        <div className="head-container">
          <h1 className="head-title">The Happiness is Giving it away</h1>
          <div className="head-btns">
            <button className="donate-btn head-btn-help">Get help now</button>
            <button className="donate-btn head-btn-video">Watch Video</button>
          </div>
          <img src={kids} alt="Kids" className="kids-img" />
        </div>
      </div>

      <div className="lower-container">
        <h1 className="lower-title">Sponsors & Partners</h1>
        <span className="lower-sub-title">
          Our journey wouldn’t be possible without the kindness of our sponsors
        </span>
        <span className="lower-sub-title">
          and partners who stand with us in making a difference.
        </span>
        <div className="lower-brands">
          <div className="brands">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faPiedPiperHat} />
            <FontAwesomeIcon icon={faRebel} />
          </div>
          <div className="brands">
            <FontAwesomeIcon icon={faKickstarter} />
            <FontAwesomeIcon icon={faWebAwesome} />
            <FontAwesomeIcon icon={faApple} />
          </div>
        </div>
      </div>

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Home;
