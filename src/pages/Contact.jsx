import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Header />
      
      {/* --- Page Header --- */}
      <div className="contact-header">
        <h1 data-aos="fade-down">Get in Touch</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Have a question about our products or want to become a partner? <br/>
          Our team in Meerut is ready to assist you.
        </p>
      </div>

      <section className="contact-section">
        <div className="contact-wrapper">
          
          {/* --- Left Column: Info --- */}
          <div className="contact-info-card" data-aos="fade-right">
            <h3 className="info-title">Contact Information</h3>
            <p className="info-subtitle">Reach out to us directly or visit our office.</p>

            <div className="info-item">
              <div className="icon-box"><MapPin size={24} /></div>
              <div>
                <h4>Address</h4>
                <p>Vill. Khari Sadhaura Road, Kal-Amb<br />Himachal Pardesh - 173030</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><Phone size={24} /></div>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+916398215627">+91 63982 15627</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:info@zenroxhealthcare.in">info@zenroxhealthcare.in</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><Clock size={24} /></div>
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Form --- */}
          <div className="contact-form-card" data-aos="fade-left">
            <h3>Send us a Message</h3>
            <form
              className="contact-form"
              action="https://formsubmit.co/info@zenroxhealthcare.in"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Inquiry - Zenrox Website" />

              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" placeholder="Ex: Dr. Amit Kumar" required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="example@gmail.com" required />
              </div>

              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <input type="tel" name="phone" placeholder="+91 98765 43210" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" placeholder="How can we help you?" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>

        {/* --- Map Section --- */}
        <div className="map-container" data-aos="fade-up" data-aos-delay="200">
          <iframe 
            title="Zenrox Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111550.92381254706!2d77.63393072210887!3d29.00615462557997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c6517a2212f05%3A0xe545300f8622f98e!2sKanker%20Khera%2C%20Meerut%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </section>
      <Footer />
    </>
  );
};

export default Contact;