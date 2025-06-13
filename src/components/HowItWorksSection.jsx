import React from 'react';
import { MapPin, Clock, Users, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

const HowItWorksSection = ({ activeSection, setActiveSection }) => {
    const playerSteps = [
        { icon: MapPin, title: "Search Courts", desc: "Find courts near you with real-time availability" },
        { icon: Clock, title: "Select Time Slot", desc: "Choose your preferred time and duration" },
        { icon: CheckCircle, title: "Confirm Booking", desc: "Secure payment and instant confirmation" }
    ];

    const vendorSteps = [
        { icon: Calendar, title: "Add Your Court", desc: "List your facility with photos and details" },
        { icon: Clock, title: "Set Schedule", desc: "Define availability and pricing" },
        { icon: TrendingUp, title: "Manage Bookings", desc: "Track bookings and earnings in real-time" }
    ];

    return (
        <section id="how-it-works" className="how-it-works">
            <div className="how-it-works-container">
                <h2 className="how-it-works-title">
                    How Athlon Works
                </h2>

                {/* Toggle Buttons */}
                <div className="how-it-works-toggle">
                    <div className="how-it-works-toggle-group">
                        <button
                            onClick={() => setActiveSection('players')}
                            className={`how-it-works-toggle-btn ${
                                activeSection === 'players' ? 'active' : ''
                            }`}
                        >
                            For Players
                        </button>
                        <button
                            onClick={() => setActiveSection('vendors')}
                            className={`how-it-works-toggle-btn ${
                                activeSection === 'vendors' ? 'active' : ''
                            }`}
                        >
                            For Vendors
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="how-it-works-content-wrapper">
                    <div
                        className="how-it-works-content-slider"
                        style={{ transform: `translateX(${activeSection === 'vendors' ? '-100%' : '0%'})` }}
                    >
                        {/* Players Section */}
                        <div className="how-it-works-section">
                            <div className="how-it-works-grid">
                                {playerSteps.map((step, index) => (
                                    <div key={index} className="how-it-works-card-group">
                                        <div className="how-it-works-card">
                                            <div className="how-it-works-icon">
                                                <step.icon size={28} />
                                            </div>
                                            <h3 className="how-it-works-card-title">{step.title}</h3>
                                            <p className="how-it-works-card-desc">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vendors Section */}
                        <div className="how-it-works-section">
                            <div className="how-it-works-grid">
                                {vendorSteps.map((step, index) => (
                                    <div key={index} className="how-it-works-card-group">
                                        <div className="how-it-works-card">
                                            <div className="how-it-works-icon">
                                                <step.icon size={28} />
                                            </div>
                                            <h3 className="how-it-works-card-title">{step.title}</h3>
                                            <p className="how-it-works-card-desc">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;