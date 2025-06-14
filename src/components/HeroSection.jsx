import React, { useEffect, useRef } from 'react';
import Soccer1SVG from '../components/svgs/Soccer1SVG.jsx';
import Soccer2SVG from '../components/svgs/Soccer2SVG.jsx';
import BasketSVG from './../components/svgs/BasketSVG.jsx';

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load GSAP and Anime.js dynamically
    const loadScripts = async () => {
      // Load GSAP
      if (!window.TweenMax) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js';
        document.head.appendChild(gsapScript);
        await new Promise(resolve => gsapScript.onload = resolve);
      }

      // Load Anime.js
      if (!window.anime) {
        const animeScript = document.createElement('script');
        animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.min.js';
        document.head.appendChild(animeScript);
        await new Promise(resolve => animeScript.onload = resolve);
      }

      // Initialize animations after scripts are loaded
      initializeAnimations();
    };

    const initializeAnimations = () => {
      const { TweenMax, TimelineMax, Power4, Expo, Bounce } = window;
      const { anime } = window;

      // Mark as loaded to hide loading spinner
      if (containerRef.current) {
        containerRef.current.classList.add('loaded');
      }

      // Initial setup
      TweenMax.set("#soccer1", { opacity: 1 });
      TweenMax.set(["#soccer2", "#basket"], { autoAlpha: 0, display: "none" });

      // Soccer 1 animations
      const backLines = anime({
        targets: ".soccer1_extra-line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 500,
        delay: function(el, i) {
          return 1000 + i * 50;
        },
        autoplay: false
      });

      const bodyLines = anime({
        targets: ".soccer1_line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 500,
        delay: function(el, i) {
          return 1000 + i * 20;
        },
        autoplay: false
      });

      const ballLines = anime({
        targets: ".soccer1ball > .soccer1ball-line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 500,
        delay: function(el, i) {
          return 1000 + i * 140;
        },
        autoplay: false
      });

      function step1_ballTL() {
        const ball = new TimelineMax({
          onStart: function() {
            ballLines.play();
          }
        });
        ball
          .staggerFromTo(
            ".soccer1ball > g:nth-child(1) > *",
            0.5,
            { scale: 0 },
            { scale: 1 },
            0.2
          )
          .to(
            ".soccer1ball",
            3,
            {
              rotation: 760,
              x: 2000,
              transformOrigin: "50% 50%",
              ease: Expo.easeOut,
              delay: 1
            }
          ).to(".soccer1ball", 1, {autoAlpha: 0}, '-=1');
        return ball;
      }

      function step1_backTL() {
        const back = new TimelineMax({
          onStart: function() {
            backLines.play();
          },
          onComplete: function() {
            backLines.play();
            backLines.reverse();
            TweenMax.staggerTo(
              ".soccer1_extra-line > g",
              1,
              { scale: 0, transformOrigin: "50% 50%", ease: Bounce.easeOut },
              0.2
            );
          }
        });

        back.staggerFromTo(
          ".soccer1_extra-line > g",
          1,
          { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
          { x: 0, rotation: 0, ease: Power4.easeOut },
          0.5
        );
        return back;
      }

      function step1_bodyTL() {
        const timeline = new TimelineMax({
          ease: Expo.easeOut,
          onStart: bodyLines.play(),
          onComplete: function() {
            bodyLines.reverse();
            setTimeout(() => {
              TweenMax.staggerTo(
                ".soccer1_fill > *",
                0.2,
                { scale: 0, transformOrigin: "50% 50%" },
                0.01
              );
            }, 2000);
          }
        });

        timeline.staggerFromTo(
          ".soccer1_fill > *",
          0.3,
          { x: -4500 },
          { x: 0 },
          0.03
        );

        return timeline;
      }

      // Soccer 2 animations
      const step2_bodyLines = anime({
        targets: ".soccer2_line path",
        strokeDashoffset: [anime.setDashoffset, 99200],
        easing: "easeInOutSine",
        duration: 2500,
        delay: function(el, i) {
          return 1000 + i * 20;
        },
        autoplay: false
      });

      const step2_bodyExtra = anime({
        targets: ".soccer2_extra-line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: function(el, i) {
          return 1000 + i * 20;
        },
        autoplay: false
      });

      function step2_bodyTL(){
        const timeline = new TimelineMax({
          onStart: function(){
            step2_bodyExtra.play();
            step2_bodyLines.play();
          }
        });

        timeline.staggerFromTo(".soccer2_fill > *", 0.2, {scale: 0, transformOrigin: "100% 100%"}, {scale: 1}, 0.03)
        .to(".soccer2_fill", 1, {onStart: function(){
          step2_bodyExtra.reverse();
          step2_bodyLines.reverse();
          step2_bodyExtra.play();
          step2_bodyLines.play();
        }})
        .staggerTo(".soccer2_fill > *", 0.2, {scale: 0, delay: 2}, 0.01);

        return timeline;
      }

      // Basketball animations
      const step3_bodyLines = anime({
        targets: ".basket_extra-line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: function(el, i) {
          return i * 20;
        },
        autoplay: false
      });

      const step3_extraLines = anime({
        targets: ".basket_line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 3500,
        delay: function(el, i) {
          return i * 20;
        },
        autoplay: false
      });

      function step3_bodyTL(){
        const timeline = new TimelineMax({
          onStart: function(){
            step3_bodyLines.play();
            step3_extraLines.play();
          }
        });
        timeline.staggerFromTo(".basket_fill > *", 0.3, {scale: 0, y: 300, transformOrigin: "0% 0%"}, {scale: 1, y: 0}, -0.008);
        return timeline;
      }

      // Utility functions
      function hide(elem){
        const tl = new TimelineMax();
        tl.to(elem, 0.1, {autoAlpha: 0})
        .to(elem, 0.1, {display: "none"});
        return tl;
      }

      function show(elem){
        const tl = new TimelineMax();
        tl.to(elem, 0.1, {autoAlpha: 1})
        .to(elem, 0.1, {display: "block"});
        return tl;
      }

      // Main timeline
      const mainTL = new TimelineMax({});

      function init() {
        mainTL
          .add(step1_bodyTL(), "step1")
          .add(step1_backTL(), "step1")
          .add(step1_ballTL(), "step1")
          .add(hide("#soccer1"), 'step2')
          .add(show("#soccer2"), 'step3')
          .add(step2_bodyTL(), 'step4')
          .add(hide("#soccer2"), 'step5')
          .add(show("#basket"), 'step6')
          .add(step3_bodyTL(), 'step7');
      }

      init();
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Clean up GSAP timelines if they exist
      if (window.TweenMax) {
        window.TweenMax.killAll();
      }
    };
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-content">
        <h1 className="hero-title">Sports Animation</h1>
        <p className="hero-subtitle">Experience dynamic sports graphics in motion</p>
        <button className="hero-cta" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
          Explore More
        </button>
      </div>
      
      <div className="animation-container" id="container">
        <Soccer1SVG />
        <Soccer2SVG />
        <BasketSVG />
      </div>
    </section>
  );
};

export default HeroSection;