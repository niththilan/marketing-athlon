import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import LiveDemoSection from './components/LiveDemoSection.jsx';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import InteractiveMapSection from './components/InteractiveMapSection';
import DownloadSection from './components/DownloadSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
// import Price from "../src/components/Price.jsx";
import './App.css';


const App = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('players');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [faqOpen, setFaqOpen] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef(null);
    const mapRef = useRef(null);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Tennis Player",
            text: "Finding courts was never this easy! Booked my favorite court in seconds.",
            rating: 5,
            type: "player"
        },
        {
            name: "Mike's Sports Complex",
            role: "Court Owner",
            text: "Our bookings increased 300% since joining Athlon. Amazing platform!",
            rating: 5,
            type: "vendor"
        },
        {
            name: "Alex Rodriguez",
            role: "Basketball Enthusiast",
            text: "Love the community features. Found my regular playing partners here!",
            rating: 5,
            type: "player"
        }
    ];

    const faqs = [
        {
            question: "How do I book a court?",
            answer: "Simply search for courts in your area, select an available time slot, and confirm your booking. Payment is processed securely through the app."
        },
        {
            question: "Can I cancel my booking?",
            answer: "Yes, you can cancel bookings up to 2 hours before your scheduled time for a full refund."
        },
        {
            question: "How do I register my court as a vendor?",
            answer: "Click 'Register Your Court' and fill out the vendor application. Our team will verify your facility and help you get set up."
        },
        {
            question: "What sports are supported?",
            answer: "We support tennis, badminton, basketball, squash, and many other court-based sports."
        }
    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const toggleFAQ = (index) => {
        setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="app">
            <Navigation
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <HeroSection
                heroRef={heroRef}
                scrollY={scrollY}
            />
            

            <HowItWorksSection
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <LiveDemoSection />

            <BenefitsSection />

            <TestimonialsSection
                testimonials={testimonials}
                currentTestimonial={currentTestimonial}
                setCurrentTestimonial={setCurrentTestimonial}
            />

            <InteractiveMapSection mapRef={mapRef} />

            <DownloadSection />

            <FAQSection
                faqs={faqs}
                faqOpen={faqOpen}
                toggleFAQ={toggleFAQ}
            />

            <ContactSection />

            <Footer />
        </div>
    );
};

export default App;