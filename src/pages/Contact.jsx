import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <>
    <Header/>
    <section className="contact-section">
      <h2 className="contact-title" data-aos="fade-up">💬 Contact Us</h2>

      <div className="contact-container">
      <form
        className="contact-form"
        action="https://formsubmit.co/info@zenroxhealthcare.in"
        method="POST"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_subject" value="New Contact Message from Zenrox" />

        <input type="text" name="name" placeholder="👤 Your Name" required />
        <input type="email" name="email" placeholder="📧 Your Email" required />
        <textarea name="message" placeholder="📝 Your Message" rows="5" required></textarea>
        <button type="submit">📨 Send Message</button>
      </form>


      <div className="contact-info" data-aos="fade-up" data-aos-delay="200">
        <h3>📍 Our Address</h3>
        <p>Vill. Khari Sadhaura Road, Kal-Amb<br />Himachal Pardesh - 173030</p>

        <h3>📞 Phone</h3>
        <p>
          <a href="tel:+916398215627" style={{ color: 'inherit', textDecoration: 'none' }}> +91 63982 15627 </a>
        </p>

        <h3>✉️ Email</h3>
        <p>
          <a href="mailto:info@zenroxhealthcare.in" style={{ color: 'inherit', textDecoration: 'none' }}> info@zenroxhealthcare.in </a>
        </p>
      </div>
      </div>

      <div className="map-container" data-aos="fade-up" data-aos-delay="300">
        <iframe title="Zenrox Location"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3689.216654203804!2d77.65204717551465!3d29.00785947546186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDAwJzI4LjMiTiA3N8KwMzknMTYuNiJF!5e1!3m2!1sen!2sin!4v1751366082521!5m2!1sen!2sin"
          width="100%" height="300"style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
      </div>

    </section>
    <Footer/>
    </>
  );
};

export default Contact;
