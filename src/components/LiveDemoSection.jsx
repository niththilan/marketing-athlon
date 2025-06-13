import React from 'react';

const LiveDemoSection = () => {
    const timeSlots = ['10:00 AM', '2:00 PM', '6:00 PM'];

    return (
        <section className="live-demo">
            <div className="live-demo-container">
                <div className="live-demo-header">
                    <h2 className="live-demo-title">
                        See Athlon in Action
                    </h2>
                    <p className="live-demo-subtitle">
                        Experience the seamless booking process with our interactive demo
                    </p>
                </div>

                <div className="live-demo-phone-container">
                    <div className="live-demo-phone-group">
                        <div className="live-demo-phone">
                            <div className="live-demo-phone-content">
                                {/* Mock App Header */}
                                <div className="live-demo-header-mock">
                                    <div className="live-demo-app-title">Athlon</div>
                                    <div className="live-demo-profile-icon"></div>
                                </div>

                                {/* Mock Search */}
                                <div className="live-demo-search">
                                    <div className="live-demo-search-label">Location</div>
                                    <div className="live-demo-search-value">Downtown Tennis Center</div>
                                </div>

                                {/* Mock Time Slots */}
                                <div className="live-demo-slots">
                                    {timeSlots.map((time, index) => (
                                        <div key={index} className={`live-demo-slot ${
                                            index === 1 ? 'selected' : ''
                                        }`}>
                                            <div className="live-demo-slot-content">
                                                <span>{time}</span>
                                                <span className="live-demo-price">$25</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mock Book Button */}
                                <button className="live-demo-book-btn">
                                    Book Court
                                </button>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="live-demo-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveDemoSection;