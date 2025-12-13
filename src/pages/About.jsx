import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ShieldCheck, Award, Microscope, Users, Target, Heart, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import team_img from '../assets/main_img2.webp';

const About = () => {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Header />
      
      {/* --- Page Header --- */}
      <div className="about-header">
        <h1 data-aos="fade-down">About Zenrox</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Bridging the gap between pharmaceutical innovation and accessible healthcare.<br/>
          Your trusted partner in wellness since 2025.
        </p>
      </div>

      {/* --- Mission Section --- */}
      <section className="about-section">
        <div className="about-container" data-aos="fade-up">
          
          <div className="about-image-wrapper">
            <img src={team_img} alt="Zenrox Team at Work" loading="lazy" />
            <div className="image-badge">
              <CheckCircle size={20} />
              <span>ISO Certified Distributor</span>
            </div>
          </div>

          <div className="about-content">
            <h4 className="section-subtitle">WHO WE ARE</h4>
            <h2>Committed to Better Health</h2>
            <p className="lead-text">
              Zenrox Healthcare is a forward-thinking pharmaceutical company committed to delivering reliable, affordable, and innovative medical solutions.
            </p>
            <p>
              Driven by science and guided by compassion, we partner with healthcare providers to promote healthier lives. 
              Our mission is simple: to make high-quality medicines accessible to everyone, everywhere.
            </p>
            
            <div className="values-list">
              <div className="value-item">
                <Target className="value-icon" size={24} />
                <div>
                  <strong>Our Mission</strong>
                  <p>To raise the standard of wellness across the nation.</p>
                </div>
              </div>
              <div className="value-item">
                <Heart className="value-icon" size={24} />
                <div>
                  <strong>Our Promise</strong>
                  <p>Delivering trust, care, and genuine quality.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="why-section">
        <div className="why-header" data-aos="fade-up">
          <h2>Why Choose Zenrox Healthcare?</h2>
          <p>We don't just supply medicine; we supply confidence.</p>
        </div>

        <div className="why-cards">
          <div className="why-card" data-aos="fade-up" data-aos-delay="0">
            <div className="icon-wrapper">
              <ShieldCheck size={32} />
            </div>
            <h3>Trusted Quality</h3>
            <p>We adhere to the highest pharmaceutical standards to ensure safety, consistency, and efficacy in every single product we distribute.</p>
          </div>

          <div className="why-card" data-aos="fade-up" data-aos-delay="100">
            <div className="icon-wrapper">
              <Award size={32} />
            </div>
            <h3>Certified & Compliant</h3>
            <p>Our operations are fully compliant with WHO-GMP and ISO standards, ensuring seamless regulatory adherence across all markets.</p>
          </div>

          <div className="why-card" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-wrapper">
              <Microscope size={32} />
            </div>
            <h3>Research-Driven</h3>
            <p>We constantly update our inventory with innovative formulations to deliver cutting-edge healthcare solutions to clinics and pharmacies.</p>
          </div>

          <div className="why-card" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-wrapper">
              <Users size={32} />
            </div>
            <h3>Customer-Centric</h3>
            <p>Building long-term relationships through dedicated B2B support, transparent communication, and rapid delivery timelines.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;