import React from 'react';

const InteractiveMapSection = ({ mapRef }) => {
    const cities = [
        { name: 'New York', x: '20%', y: '30%', courts: 150 },
        { name: 'Los Angeles', x: '10%', y: '60%', courts: 120 },
        { name: 'Chicago', x: '35%', y: '40%', courts: 85 },
        { name: 'Miami', x: '80%', y: '80%', courts: 95 },
        { name: 'Seattle', x: '15%', y: '20%', courts: 70 }
    ];

    return (
        <section ref={mapRef} className="interactive-map">
            <div className="interactive-map-container">
                <div className="interactive-map-header">
                    <h2 className="interactive-map-title">
                        Courts Everywhere
                    </h2>
                    <p className="interactive-map-subtitle">
                        Join thousands of courts across major cities
                    </p>
                </div>

                <div className="interactive-map-wrapper">
                    {/* Mock Map */}
                    <div className="interactive-map-canvas">
                        {/* Mock Cities */}
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className="interactive-map-city"
                                style={{ left: city.x, top: city.y }}
                            >
                                <div className="interactive-map-ping"></div>
                                <div className="interactive-map-dot"></div>
                                <div className="interactive-map-tooltip">
                                    {city.name}: {city.courts} courts
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMapSection;