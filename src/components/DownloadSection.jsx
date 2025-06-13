import React from 'react';
import { Download } from 'lucide-react';

const DownloadSection = () => {
    return (
        <section id="download" className="download">
            <div className="download-container">
                <h2 className="download-title">
                    Ready to Play?
                </h2>
                <p className="download-subtitle">
                    Download Athlon now and start booking your favorite courts instantly
                </p>

                <div className="download-buttons">
                    <button className="download-btn">
                        <div className="download-btn-content">
                            <Download size={24} className="download-btn-icon" />
                            <div className="download-btn-text">
                                <div className="download-btn-label">Download on the</div>
                                <div className="download-btn-store">App Store</div>
                            </div>
                        </div>
                    </button>

                    <button className="download-btn">
                        <div className="download-btn-content">
                            <Download size={24} className="download-btn-icon" />
                            <div className="download-btn-text">
                                <div className="download-btn-label">Get it on</div>
                                <div className="download-btn-store">Google Play</div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="download-vendor-section">
                    <h3 className="download-vendor-title">Court Owners</h3>
                    <p className="download-vendor-subtitle">Join our network and boost your bookings</p>
                    <button className="download-vendor-btn">
                        Register Your Court
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;