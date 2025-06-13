import React from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-logo">
                        Athlon
                    </div>

                    {/* Desktop Menu */}
                    <div className="nav-menu-desktop">
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                        <a href="#benefits" className="nav-link">Benefits</a>
                        <a href="#testimonials" className="nav-link">Reviews</a>
                        <a href="#download" className="nav-link">Download</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="nav-mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="nav-mobile-menu">
                    <div className="nav-mobile-content">
                        <a href="#how-it-works" className="nav-mobile-link">How It Works</a>
                        <a href="#benefits" className="nav-mobile-link">Benefits</a>
                        <a href="#testimonials" className="nav-mobile-link">Reviews</a>
                        <a href="#download" className="nav-mobile-link">Download</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;