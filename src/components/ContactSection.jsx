import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactSection = () => {
    return (
        <section className="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">
                        Get in Touch
                    </h2>
                    <p className="contact-subtitle">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="contact-info-title">Contact Info</h3>
                        <div className="contact-info-list">
                            <div className="contact-info-item">
                                <Mail size={20} className="contact-info-icon" />
                                <span>hello@athlon.app</span>
                            </div>
                            <div className="contact-info-item">
                                <Phone size={20} className="contact-info-icon" />
                                <span>+1 (555) 123-GAME</span>
                            </div>
                            <div className="contact-info-item">
                                <MessageCircle size={20} className="contact-info-icon" />
                                <span>24/7 Chat Support</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="contact-input"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="contact-input"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                className="contact-textarea"
                            ></textarea>
                            <button
                                type="submit"
                                className="contact-submit-btn"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;