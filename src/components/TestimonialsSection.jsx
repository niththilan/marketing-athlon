import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = ({ testimonials, currentTestimonial, setCurrentTestimonial }) => {
    return (
        <section id="testimonials" className="testimonials">
            <div className="testimonials-container">
                <h2 className="testimonials-title">
                    What Our Community Says
                </h2>

                <div className="testimonials-slider-wrapper">
                    <div
                        className="testimonials-slider"
                        style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonials-slide">
                                <div className="testimonials-card">
                                    <div className="testimonials-stars">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="testimonials-star" />
                                        ))}
                                    </div>
                                    <p className="testimonials-text">"{testimonial.text}"</p>
                                    <div className="testimonials-author">
                                        <div className="testimonials-avatar">
                                            <span>{testimonial.name[0]}</span>
                                        </div>
                                        <div className="testimonials-info">
                                            <div className="testimonials-name">{testimonial.name}</div>
                                            <div className="testimonials-role">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="testimonials-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            className={`testimonials-dot ${
                                index === currentTestimonial ? 'active' : ''
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;