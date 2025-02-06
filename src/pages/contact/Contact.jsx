import React from "react";
import "./Contact.scss";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
function Contact() {
  return (
    <>
      <div className="container contactp">
        <p className="pd">
          <Link to={"/"}>Home</Link> / <span>Contact</span>
        </p>
        <div className="flex">
          <div className="left">
            <div className="contact-card">
              <div className="contact-section">
                <div className="flex_2">
                  <div className="icon">
                    <FiPhone />
                  </div>
                  <h2>Call To Us</h2>
                </div>
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +8801611112222</p>
              </div>
              <hr />
              <div className="contact-section sec">
                <div className="flex_2">
                  <div className="icon">
                    <MdOutlineMailOutline />
                  </div>
                  <h2>Write To Us</h2>
                </div>
                <div className="lineh">
                  <p>
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <p>
                    <strong>Emails:</strong> customer@exclusive.com
                  </p>
                  <p>
                    <strong>Emails:</strong> support@exclusive.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <form className="contact-form">
              <div className="right_inp">
              <div className="flexx">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                className="form-input"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                required
                className="form-input"
              />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="form-textarea"
              ></textarea>
              <button type="submit" className="form-button">
                Send Message
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;