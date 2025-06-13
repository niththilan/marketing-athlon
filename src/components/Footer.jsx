import React from 'react';

const Footer = () => {
    const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin'];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            Athlon
                        </div>
                        <p className="footer-description">
                            Your ultimate sports court booking platform. Play more, stress less.
                        </p>
                        <div className="footer-social">
                            {socialPlatforms.map((social) => (
                                <div key={social} className="footer-social-item">
                                    <div className="footer-social-icon"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-links-title">For Players</h4>
                        <ul className="footer-links-list">
                            <li><a href="#" className="footer-link">Find Courts</a></li>
                            <li><a href="#" className="footer-link">Book Now</a></li>
                            <li><a href="#" className="footer-link">Find Partners</a></li>
                            <li><a href="#" className="footer-link">Community</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-links-title">For Vendors</h4>
                        <ul className="footer-links-list">
                            <li><a href="#" className="footer-link">List Your Court</a></li>
                            <li><a href="#" className="footer-link">Manage Bookings</a></li>
                            <li><a href="#" className="footer-link">Analytics</a></li>
                            <li><a href="#" className="footer-link">Support</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-links-title">Support</h4>
                        <ul className="footer-links-list">
                            <li><a href="#" className="footer-link">Help Center</a></li>
                            <li><a href="#" className="footer-link">Contact Us</a></li>
                            <li><a href="#" className="footer-link">Privacy Policy</a></li>
                            <li><a href="#" className="footer-link">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2024 Athlon. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <a href="#" className="footer-legal-link">Privacy</a>
                        <a href="#" className="footer-legal-link">Terms</a>
                        <a href="#" className="footer-legal-link">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;