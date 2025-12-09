import { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import team_img from '../assets/main_img2.webp'

const About = () => {

    useEffect(() => {
  AOS.init({ duration: 600, once: true });
}, []);

  return (
    <>
        <Header/>
        <section className="about-section">
            <div className="about-container">
                <div className="about-image">
                <img data-aos="fade-in" src={team_img} alt="Our Team" />
                </div>

                <div className="about-content">
                <h1 data-aos="fade-up">About Us</h1>
                <p>Zenrox Pharmaceuticals is a forward-thinking healthcare company committed to delivering reliable, affordable, and innovative medical solutions. Our mission is to make high-quality medicines accessible to everyone, everywhere.</p>
                <p>Driven by science and guided by compassion, we partner with healthcare providers and communities to promote healthier lives. With a strong focus on research, compliance, and patient care, Zenrox is dedicated to raising the standard of wellness across the nation.</p>
                <p>We don’t just manufacture medicines — we deliver trust, care, and a promise of better health.</p>
                </div>
            </div>
        </section>
        <section className="why-section">
            <h2 className="section-heading" data-aos="fade-up">Why Choose Us</h2>

            <div className="why-cards">
                <div className="why-card" data-aos="fade-up" data-aos-delay="100">
                <span>🧬</span>
                <h3>Trusted Quality</h3>
                <p>We adhere to the highest pharmaceutical manufacturing standards to ensure safety, consistency, and efficacy in every product.</p>
            </div>

            <div className="why-card" data-aos="fade-up" data-aos-delay="200">
                <span>✅</span>
                <h3>Certified & Compliant</h3>
                <p>Our facilities are certified with WHO-GMP, ISO, and other global health standards — ensuring regulatory compliance worldwide.</p>
            </div>

            <div className="why-card" data-aos="fade-up" data-aos-delay="300">
                <span>🔬</span>
                <h3>Research-Driven</h3>
                <p>We invest in R&D to develop innovative formulations and deliver cutting-edge healthcare solutions to the global market.</p>
            </div>

            <div className="why-card" data-aos="fade-up" data-aos-delay="400">
                <span>🤝</span>
                <h3>Customer-Centric</h3>
                <p>We build long-term relationships through dedicated support, transparent communication, and reliable delivery timelines.</p>
            </div>
            </div>
        </section>

        <Footer/>
    </>
  )
}

export default About
