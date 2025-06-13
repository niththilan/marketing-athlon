import React from 'react';
import { Clock, MapPin, Users, TrendingUp, Smartphone, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
    const benefits = [
        { icon: Clock, title: "24/7 Booking", desc: "Book courts anytime, anywhere with instant confirmation" },
        { icon: MapPin, title: "Discover Courts", desc: "Find hidden gems and popular courts in your area" },
        { icon: Users, title: "Connect & Play", desc: "Find playing partners and join the community" },
        { icon: TrendingUp, title: "Boost Revenue", desc: "Vendors see average 200% increase in bookings" },
        { icon: Smartphone, title: "Smart Management", desc: "Automated scheduling and payment processing" },
        { icon: CheckCircle, title: "Zero Hassle", desc: "Seamless experience for both players and vendors" }
    ];

    return (
        <section id="benefits" className="benefits">
            <div className="benefits-container">
                <h2 className="benefits-title">
                    Why Choose Athlon?
                </h2>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefits-card-group">
                            <div className="benefits-card">
                                <div className="benefits-icon">
                                    <benefit.icon size={28} />
                                </div>
                                <h3 className="benefits-card-title">{benefit.title}</h3>
                                <p className="benefits-card-desc">{benefit.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;