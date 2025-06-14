import React, { useEffect, useRef } from 'react';

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
        {/* Include complete SVG content using dangerouslySetInnerHTML to maintain structure */}
        <div 
          dangerouslySetInnerHTML={{
            __html: `
              <svg xmlns="http://www.w3.org/2000/svg" opacity="0" xmlns:xlink="http://www.w3.org/1999/xlink" id="soccer1" x="0px" y="0px" enable-background="new 0 0 2948.4 2312.3" version="1.1" viewBox="0 0 2948.4 2312.3" xml:space="preserve">
		<title>
			soccer-1
		</title>
		<g class="soccer1ball">
			<g>
				<polygon fill="#FFFFFF" points="2731.4,2053.3 2802.7,2098 2784.7,2026" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2764.7,2117.3 2802.7,2098 2798,2198.7" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2764.7,2117.3 2759.4,2176 2798,2198.7" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2852,2129.3 2802.7,2098 2868.7,2044.7" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2852,2129.3 2896.7,2094.7 2868.7,2044.7" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2812.7,2046 2868.7,2044.7 2878.7,2024.7" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2878.7,2024.7 2917.4,2046 2880.7,2013.3" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2920.7,2116 2939.4,2088 2917.4,2046" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2888.7,2198 2923.4,2170 2920.7,2116" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2892.7,2236.7 2934,2180.7 2888.7,2198" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2920.7,2116 2947.4,2137.3 2939.4,2088" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2798,2198.7 2804.7,2244 2867.4,2233.3" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2804.7,2244 2773.4,2252.7 2798,2198.7" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2773.4,2252.7 2718.7,2212.7 2759.4,2176" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2773.4,2252.7 2822,2262 2804.7,2244" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2822,2262 2865.4,2250.7 2804.7,2244" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2865.4,2250.7 2892.7,2236.7 2867.4,2233.3" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2718.7,2212.7 2737.4,2239.3 2773.4,2252.7" opacity="0.4" />
				<polygon fill="#FFFFFF" points="2718.7,2212.7 2690,2184 2679.4,2126.7" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2694,2066 2731.4,2053.3 2720,2092" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2713.4,2037.3 2749.4,2007.3 2731.4,2053.3" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2696.7,2135.3 2718,2184 2759.4,2176" opacity="0.2" />
				<polygon fill="#FFFFFF" points="2696.7,2135.3 2764.7,2117.3 2720,2092" opacity="0.4" />
			</g>
			<g class="soccer1ball-line" style="fill:none;stroke:#fff;stroke-linejoin:round;stroke-width:2px">
				<polygon points="2784.7 2026.01 2812.7 2046.01 2802.7 2098.01 2784.7 2026.01" />
				<polygon points="2731.37 2053.34 2802.7 2098.01 2784.7 2026.01 2731.37 2053.34" />
				<polygon points="2731.37 2053.34 2720.04 2092.01 2764.7 2117.34 2731.37 2053.34" />
				<polygon points="2764.7 2117.34 2802.7 2098.01 2798.04 2198.68 2764.7 2117.34" />
				<polygon points="2764.7 2117.34 2759.37 2176.01 2798.04 2198.68 2764.7 2117.34" />
				<polygon points="2798.04 2198.68 2850.04 2170.68 2852.04 2129.34 2798.04 2198.68" />
				<polygon points="2852.04 2129.34 2802.7 2098.01 2868.7 2044.68 2852.04 2129.34" />
				<polygon points="2852.04 2129.34 2896.7 2094.68 2868.7 2044.68 2852.04 2129.34" />
				<polygon points="2812.7 2046.01 2868.7 2044.68 2878.7 2024.68 2812.7 2046.01" />
				<polygon points="2784.7 2026.01 2796.7 1999.34 2812.7 2046.01 2784.7 2026.01" />
				<polygon points="2796.7 1999.34 2832.7 1996.01 2794.7 1995.34 2796.7 1999.34" />
				<polygon points="2832.7 1996.01 2878.7 2024.68 2880.7 2013.34 2832.7 1996.01" />
				<polygon points="2878.7 2024.68 2917.37 2046.01 2880.7 2013.34 2878.7 2024.68" />
				<polygon points="2917.37 2046.01 2896.7 2094.68 2920.7 2116.01 2917.37 2046.01" />
				<polygon points="2920.7 2116.01 2939.37 2088.01 2917.37 2046.01 2920.7 2116.01" />
				<polygon points="2852.04 2129.34 2888.7 2198.01 2850.04 2170.68 2852.04 2129.34" />
				<polygon points="2888.7 2198.01 2923.37 2170.01 2920.7 2116.01 2888.7 2198.01" />
				<polygon points="2888.7 2198.01 2867.37 2233.34 2892.7 2236.68 2888.7 2198.01" />
				<polygon points="2892.7 2236.68 2934.04 2180.68 2888.7 2198.01 2892.7 2236.68" />
				<polygon points="2923.37 2170.01 2934.04 2180.68 2947.37 2137.34 2923.37 2170.01" />
				<polygon points="2920.7 2116.01 2947.37 2137.34 2939.37 2088.01 2920.7 2116.01" />
				<polygon points="2798.04 2198.68 2804.7 2244.01 2867.37 2233.34 2798.04 2198.68" />
				<polygon points="2804.7 2244.01 2773.37 2252.68 2798.04 2198.68 2804.7 2244.01" />
				<polygon points="2773.37 2252.68 2718.7 2212.68 2759.37 2176.01 2773.37 2252.68" />
				<polygon points="2718.7 2212.68 2718.04 2184.01 2759.37 2176.01 2718.7 2212.68" />
				<polygon points="2773.37 2252.68 2822.04 2262.01 2804.7 2244.01 2773.37 2252.68" />
				<polygon points="2822.04 2262.01 2865.37 2250.68 2804.7 2244.01 2822.04 2262.01" />
				<polygon points="2865.37 2250.68 2892.7 2236.68 2867.37 2233.34 2865.37 2250.68" />
				<polygon points="2718.7 2212.68 2737.37 2239.34 2773.37 2252.68 2718.7 2212.68" />
				<polygon points="2718.7 2212.68 2690.04 2184.01 2679.37 2126.68 2718.7 2212.68" />
				<polygon points="2679.37 2126.68 2696.7 2135.34 2720.04 2092.01 2679.37 2126.68" />
				<polygon points="2679.37 2126.68 2694.04 2066.01 2720.04 2092.01 2679.37 2126.68" />
				<polygon points="2694.04 2066.01 2731.37 2053.34 2720.04 2092.01 2694.04 2066.01" />
				<polygon points="2694.04 2066.01 2713.37 2037.34 2731.37 2053.34 2694.04 2066.01" />
				<polygon points="2713.37 2037.34 2749.37 2007.34 2731.37 2053.34 2713.37 2037.34" />
				<polygon points="2749.37 2007.34 2784.7 2026.01 2794.7 1995.34 2749.37 2007.34" />
				<polygon points="2696.7 2135.34 2718.04 2184.01 2759.37 2176.01 2696.7 2135.34" />
				<polygon points="2696.7 2135.34 2764.7 2117.34 2720.04 2092.01 2696.7 2135.34" />
			</g>
		</g>
		<g class="soccer1_fill" data-name="FILL">
			<polygon fill="#FFFFFF" points="1859.2,936.7 1731.5,1087.9 1862.1,809.9 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1732.2,1089.9 1859.4,934.2 1781,750 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1771.9,816.2 1743.4,774.5 1810.6,726.6 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1736.3,906.8 1609.7,1049 1738.3,786.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1643.7,979.3 1646.1,868 1759.1,819.1 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1602.6,862.6 1628.7,811.5 1678.7,784.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1678.7,784.3 1643.9,920.2 1755.9,752.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1678.7,784.3 1751.5,732.2 1813.5,764.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1688.5,795.2 1668.9,757.2 1539.6,758.2 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1625.4,864.8 1563.5,846.3 1628.7,811.5 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1773.3,733.2 1807,662.6 1835.2,770.2 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1785.2,699.5 1800.4,576.7 1850.4,515.9 	" opacity="0.5" />
			<polygon fill="#FFFFFF" points="1800.4,576.7 1886.3,673.5 1942.8,585.4 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1828.5,583.5 1850.4,515.9 1942.8,585.4 	" opacity="0.5" />
			<polygon fill="#FFFFFF" points="1856.4,518.3 1944.4,598.8 2052.4,607.3 	" opacity="0.5" />
			<polygon fill="#FFFFFF" points="1850.4,515.9 2055.8,607.2 1955.8,502.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1850.4,515.9 1904.8,492 1966.7,514.8 	" opacity="0.5" />
			<polygon fill="#FFFFFF" points="1926.5,531.1 1942.8,585.4 2033,628.9 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2033,628.9 2055.8,607.2 1967.8,535.4 	" opacity="0.3" />
			<polyline fill="#FFFFFF" points="1593.7,1208.7 1537,1263.7 1608.7,1050.5 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1803.3,1171.7 1843.8,1399.1 1853.9,1100.2 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1970.3,1256.8 1843.8,1399.1 1972.3,1136.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1970.3,1256.8 1843.8,1399.1 1976.7,1292.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1932.7,1377.3 1843.8,1399.1 1976.7,1292.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1970.3,1256.8 1851.3,1152 1972.3,1136.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1858.4,981 1728,954.7 1883.8,942.4 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1731.2,1089.9 1729.1,955.6 1801.4,845.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1729.1,953.6 1631.4,1024.8 1736.3,905.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1697.4,1034.3 1593.8,1208 1666.7,1020.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1697.4,1034.3 1729,954 1724.7,1043.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1537.4,1264 1492.7,1213.3 1470,1278.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1491,1261 1435.4,1221.3 1538,1206 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1565,1137.3 1493,1213.3 1534.4,1140 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1675.4,1128.7 1554,1110 1581.4,1082 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1803.3,1171.7 1696.7,1177.3 1853.9,1100.2 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1803.3,1171.7 1734.7,1381.3 1581.4,1349.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1628.7,1236 1842,1391.3 1781.4,1234 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1883.4,944 1854,1100.7 1951.4,1008.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1979.4,1100.7 1899.4,1091.3 1956,1048 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1838.3,1519.1 1711.3,1413 1840.3,1399.1 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1838.3,1519.1 1711.3,1413 1548.7,1538.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1472.7,1538.7 1584,1428.7 1548.7,1538.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1681.4,1382 1584,1428.7 1548.7,1538.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1589.4,1641.3 1696.7,1528.7 1530,1580.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1696.7,1527.3 1581.9,1428.3 1711,1414.4 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1640.7,1668 1830,1561.3 1590,1642 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1838,1520 1910.7,1522.7 1938.4,1431.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1865.5,1429.5 1938.2,1432.2 1857.4,1471.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2058.9,1580.8 1908.4,1522.8 1857.4,1639.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1996.4,1533.8 1974.9,1507.8 1903.4,1564.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1880.4,1633.3 2198.4,1737.8 2038.9,1586.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2058.9,1580.8 2158.4,1661.3 2030.9,1663.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2158.4,1661.3 2220.4,1719.8 2114.9,1845.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1766.4,1639.3 1854.9,1721.3 1831.5,1561.5 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1865.4,1681.8 2115.9,1845.3 1903.4,1564.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2115.9,1845.3 2251.9,1814.3 2239.9,1756.8 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2220.4,1719.8 2239.9,1756.8 2108.9,1789.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2115.9,1845.3 2140.9,1976.8 2176.9,1905.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2140.9,1976.8 2232.9,2090.8 2176.9,1905.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2251.9,1814.3 2177.4,2020.8 2346.4,2033.8 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2346.4,2033.8 2380.9,2092.8 2177.4,2020.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1435.4,1221.3 1416.7,1258 1417.4,1274 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1417.4,1277.3 1428.4,1294.8 1461.4,1239.8 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1428.4,1294.8 1435.4,1301.3 1478.4,1252.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1435.4,1301.3 1446.4,1316.3 1470,1278.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1472.7,1538.7 1429.2,1789.2 1530.7,1732.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1472.7,1538.7 1380.7,1679.3 1556.7,1652 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1278,1550.7 1248.7,1626.7 1319.4,1707.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1363.4,1504 1122,1356.7 1278,1550.7 	" opacity="0.1" />
			<polygon fill="#FFFFFF" points="1122,1356.7 1066,1378 1286,1502 	" opacity="0.1" />
			<polygon fill="#FFFFFF" points="1087.4,1468 1100,1430 1256.7,1600 	" opacity="0.1" />
			<polygon fill="#FFFFFF" points="1117.4,1491.3 1248.7,1626.7 1278,1550.7 	" opacity="0.1" />
			<polygon fill="#FFFFFF" points="1165.4,1370 1150,1304 1038,1302 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="830.7,1352.7 860.7,1388 952.7,1298 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="896.7,1352.7 1066,1378 969.4,1318 	" opacity="0.1" />
			<polygon fill="#FFFFFF" points="1038,1302 1066,1378 969.4,1318 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1054.7,1383.3 983.4,1391.3 1030.7,1462 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="907.4,1404.7 999.4,1417.3 896.7,1352.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2425.4,2148.7 2472,2159.3 2439.4,2204 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2431.4,2243.3 2439.4,2204 2496,2226.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2496,2226.7 2539.4,2204 2472,2159.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2539.4,2204 2600,2149.3 2533.4,2146 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2600,2149.3 2607.4,2158 2571.4,2220 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2424.7,2270 2444.7,2282 2450,2251.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2444.7,2282 2464,2262.7 2450,2251.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2455.7,2248.3 2470.4,2243.7 2483.4,2256.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2430.7,2290 2444.7,2302 2456,2279.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2444.7,2302 2461,2292.3 2456,2279.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2411.7,2297.3 2428,2311.3 2424.4,2289.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2428,2311.3 2434,2304 2424.4,2289.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2492.4,2269.3 2513.4,2279 2506,2261.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2511.7,2261.7 2526,2271.3 2532.7,2251.7 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2526,2271.3 2537,2265 2532.7,2251.7 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2518,2233 2532,2238.3 2542.7,2216.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2529.7,2236 2543.7,2229.3 2535,2221 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2541,2246 2551.4,2253 2560.4,2242.3 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2541,2246 2560.4,2242.3 2558.4,2229.7 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="1649.4,927.8 1610.2,901.7 1602.6,862.6 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1539.6,758.2 1514.6,786.5 1563.5,846.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="1539.6,758.2 1521.1,722.4 1464.6,734.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2232.9,2090.8 2349.6,2198.7 2392.2,2183.4 
            2425.4,2148.7 	" opacity="0.2" />
			<polygon fill="#FFFFFF" points="2380.9,2092.8 2425.4,2148.7 2343.4,2165.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2399.4,2300 2343.4,2311.3 2431.4,2243.3 	" opacity="0.3" />
			<polygon fill="#FFFFFF" points="2343.4,2311.3 2303.4,2265.3 2348.7,2236.7 	" opacity="0.3" />

		</g>
		<g class="soccer1_extra-line" data-name="Extra Line">
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="753,1032.3 1,406 832.1,1366.1 
            1132.1,1348.1 795.2,1067.5 	" />
			<line x1="998.3" x2="1159.1" y1="683.3" y2="1378.1" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="1001.2" x2="987.1" y1="859.6" y2="677.3" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="1036.1" x2="1004.8" y1="1309.1" y2="905.1" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="587" x2="759.1" y1="788" y2="1028" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="790,1071.2 952.1,1297.1 103,928.1 
            199,247 545.3,730 	" />
			<line x1="541.5" x2="103" y1="771" y2="928.1" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="924.5" x2="614.5" y1="633.7" y2="744.8" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="1573.2,1426.1 1033.1,1261.1 595.1,337 
            915.8,565.8 	" />
			<line x1="892.3" x2="1" y1="594.1" y2="406" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="1239.4,1164.8 205,1339.1 942.5,650 	" />
			<line x1="1558.2" x2="1308" y1="1111.1" y2="1153.3" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="982.6" x2="605.6" y1="875.9" y2="771.3" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="1312.8,844.7 1603.2,1048.1 1029.6,889 	
            " />
			<line x1="1033" x2="1264.2" y1="648.7" y2="810.7" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="982.1" x2="982.1" y1="538.7" y2="160" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="1253.9" x2="1013.3" y1="1129.9" y2="672.4" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<line x1="1468.2" x2="1288.8" y1="1537.2" y2="1196.1" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="1233.6,458.1 670.1,1 922.8,557.5 	" />
			<line x1="1286.7" x2="1260.7" y1="792.7" y2="505.7" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" />
			<polyline fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="2" points="973.9,670.2 1351.1,1501.2 1293.2,863.5 
                " />
			<g>
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="886.9,599.3 951.6,520.5 1004,549 
                1068,609.2 1002.6,684.3 950.9,659.5 888.3,597.6 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" points="889.3,598.6 940.8,627.7 1002,685.5 		
                " />
				<line x1="940.8" x2="1004" y1="627.7" y2="549" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" />
			</g>
			<g>
				<polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1240,439.7 1226.8,472.2 1244.9,509 
                1288.4,502.9 1300.8,470 1282.9,434.6 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1245.7,508 1259.2,474.5 1242,440.8 		
                " />
				<line x1="1260" x2="1300.8" y1="475.1" y2="470" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" />
			</g>
			<g>
				<polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="550.7,715.7 534.3,763 553.8,781.9 
                598.6,791.8 615.2,744.1 595.2,726.1 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="554.3,780.7 570.5,733.6 552.7,717.4 		
                " />
				<line x1="615.2" x2="570.5" y1="744.1" y2="733.6" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" />
			</g>
			<g>
				<line x1="783.7" x2="767.3" y1="1075.3" y2="1037.9" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" />
				<polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" points="743.7,1039.1 762.6,1076.7 783.7,1075.3 
                816.3,1055 797.8,1018.2 776.1,1019 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" points="744.9,1039.7 767.3,1037.9 797.2,1018.6 
                        " />
			</g>
			<g>
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" points="991,856.1 978.8,888.6 991,902.4 
                1021.1,910.4 1034.3,878.2 1021,865.1 990.5,856.3 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" points="990.8,857.2 1003.8,870.2 1032.6,877.6 
                        " />
				<line x1="991" x2="1003.8" y1="902.4" y2="870.2" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" />
			</g>
			<g>
				<polygon fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1258.8,815.9 1264.2,844.1 1293.3,862.3 
                1321.1,839.5 1314.3,810.5 1286.4,793.4 		" />
				<line x1="1288.1" x2="1314.3" y1="833.9" y2="810.5" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1260,817.3 1288.1,833.9 1292.8,861.5 		
                " />
			</g>
			<g>
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1261.1,1121.2 1297.5,1139.3 
                1311.8,1159.1 1288.8,1197.5 1249.8,1180.1 1236.3,1160.4 1261.1,1121.2 		" />
				<polyline fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" points="1249.8,1180.1 1274.6,1142.3 
                1261.1,1122.4 		" />
				<line x1="1310.5" x2="1275.1" y1="1159.1" y2="1142.5" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="3" />
			</g>
		</g>
		<g class="soccer1_line" data-name="LINE" style="fill:none;stroke:#fff;stroke-linejoin:round;stroke-width:2px">
			<polygon points="1803.31 1171.71 1843.78 1399.05 1853.86 1100.2 1803.31 1171.71" />
			<polygon points="1803.31 1171.71 1744.04 1076.01 1853.86 1100.2 1803.31 1171.71" />
			<polygon points="1803.31 1171.71 1931.65 1119.43 1853.86 1100.2 1803.31 1171.71" />
			<polygon points="1970.32 1256.81 1843.78 1399.05 1972.35 1136.73 1970.32 1256.81" />
			<polygon points="1970.32 1256.81 1843.78 1399.05 1976.7 1292.68 1970.32 1256.81" />
			<polygon points="1932.7 1377.34 1843.78 1399.05 1976.7 1292.68 1932.7 1377.34" />
			<polygon points="1970.32 1256.81 1851.26 1152 1972.35 1136.73 1970.32 1256.81" />
			<polygon points="1978.79 1100.61 1851.26 1152 1972.35 1136.73 1978.79 1100.61" />
			<polygon points="1859.15 936.74 1731.48 1087.93 1862.05 809.87 1859.15 936.74" />
			<polygon points="1732.2 1089.92 1859.4 934.23 1781.04 750.04 1732.2 1089.92" />
			<polygon points="1771.88 816.19 1743.39 774.46 1810.55 726.64 1771.88 816.19" />
			<polygon points="1858.38 981.04 1728.04 954.68 1883.82 942.37 1858.38 981.04" />
			<polygon points="1822.76 1027.85 1764.76 1049.22 1859.37 980.68 1822.76 1027.85" />
			<polygon points="1736.27 906.75 1609.73 1049 1738.3 786.68 1736.27 906.75" />
			<polygon points="1731.18 1089.92 1729.14 955.6 1801.39 845.7 1731.18 1089.92" />
			<polygon points="1729.14 953.56 1631.45 1024.79 1736.27 905.74 1729.14 953.56" />
			<polygon points="1581.59 1082.8 1730.87 1090.34 1607.03 1054.3 1581.59 1082.8" />
			<polygon points="1593.71 1208.68 1537.01 1263.74 1608.7 1050.5 1593.71 1208.68" />
			<polygon points="1593.71 1208.68 1537.01 1263.74 1608.7 1050.5 1593.71 1208.68" />
			<polygon points="1730.16 1073.64 1592.79 1208.98 1724.37 1043.34 1730.16 1073.64" />
			<polygon points="1697.37 1034.34 1593.8 1207.96 1724.71 1043.34 1697.37 1034.34" />
			<polygon points="1697.37 1034.34 1593.8 1207.96 1724.71 1043.34 1697.37 1034.34" />
			<polygon points="1697.37 1034.34 1593.8 1207.96 1666.71 1020.34 1697.37 1034.34" />
			<polygon points="1697.37 1034.34 1729.04 954.01 1724.71 1043.34 1697.37 1034.34" />
			<polygon points="1666.37 1020.68 1608.37 1053.68 1643.71 979.34 1666.37 1020.68" />
			<polygon points="1537.37 1264.01 1492.71 1213.34 1470.04 1278.68 1537.37 1264.01" />
			<polygon points="1491.04 1261.01 1435.37 1221.34 1538.04 1206.01 1491.04 1261.01" />
			<polygon points="1491.04 1261.01 1537.37 1207.34 1537.37 1274.68 1491.04 1261.01" />
			<polygon points="1537.37 1208.68 1594.04 1206.01 1554.71 1110.01 1537.37 1208.68" />
			<polygon points="1565.04 1137.34 1493.04 1213.34 1534.37 1140.01 1565.04 1137.34" />
			<polygon points="1565.04 1137.34 1554.71 1109.68 1534.37 1140.01 1565.04 1137.34" />
			<polygon points="1675.37 1128.68 1554.04 1110.01 1581.37 1082.01 1675.37 1128.68" />
			<polygon points="1803.31 1171.71 1696.71 1177.34 1853.86 1100.2 1803.31 1171.71" />
			<polygon points="1803.31 1171.71 1696.71 1177.34 1581.37 1349.34 1803.31 1171.71" />
			<polygon points="1803.31 1171.71 1734.71 1381.34 1581.37 1349.34 1803.31 1171.71" />
			<polygon points="1638.71 1331.34 1578.04 1417.34 1581.37 1349.34 1638.71 1331.34" />
			<polygon points="1589.37 1367.34 1578.04 1417.34 1618.71 1388.68 1589.37 1367.34" />
			<polygon points="1589.37 1367.34 1718.71 1378.68 1618.71 1388.68 1589.37 1367.34" />
			<polygon points="1589.37 1367.34 1718.71 1378.68 1690.04 1294.01 1589.37 1367.34" />
			<polygon points="1673.37 1127.34 1662.04 1177.34 1728.04 1141.34 1673.37 1127.34" />
			<polygon points="1628.04 1236.68 1696.71 1176.68 1690.04 1295.34 1628.04 1236.68" />
			<polygon points="1628.71 1236.01 1842.04 1391.34 1781.37 1234.01 1628.71 1236.01" />
			<polygon points="1769.37 1417.34 1718.71 1378.68 1836.04 1395.34 1769.37 1417.34" />
			<polygon points="1883.37 944.01 1854.04 1100.68 1954.55 1004.99 1883.37 944.01" />
			<polygon points="1742.32 1081.81 1615.78 1224.05 1748.71 1117.68 1742.32 1081.81" />
			<polygon points="1979.37 1100.68 1899.37 1091.34 1956.04 1048.01 1979.37 1100.68" />
			<polygon points="1838.32 1519.14 1711.26 1413 1840.35 1399.06 1838.32 1519.14" />
			<polygon points="1838.32 1519.14 1711.26 1413 1548.71 1538.68 1838.32 1519.14" />
			<polygon points="1472.71 1538.68 1584.04 1428.68 1548.71 1538.68 1472.71 1538.68" />
			<polygon points="1681.37 1382.01 1584.04 1428.68 1548.71 1538.68 1681.37 1382.01" />
			<polygon points="1584.71 1551.34 1530.04 1582.01 1548.71 1538.68 1584.71 1551.34" />
			<polygon points="1589.37 1641.34 1696.71 1528.68 1530.04 1580.68 1589.37 1641.34" />
			<polygon points="1696.71 1527.34 1581.92 1428.33 1711.02 1414.4 1696.71 1527.34" />
			<polygon points="1806.71 1341.68 1748.04 1357.01 1766.71 1313.68 1806.71 1341.68" />
			<polygon points="1640.71 1668.01 1830.04 1561.34 1590.04 1642.01 1640.71 1668.01" />
			<polygon points="1838.04 1520.01 1910.7 1522.68 1827.37 1563.34 1838.04 1520.01" />
			<polygon points="1838.04 1520.01 1910.7 1522.68 1938.37 1431.34 1838.04 1520.01" />
			<polygon points="1865.54 1429.51 1938.2 1432.18 1857.37 1471.34 1865.54 1429.51" />
			<polygon points="1831.54 1561.51 1904.2 1564.18 1851.87 1717.84 1831.54 1561.51" />
			<polygon points="2058.87 1580.84 1908.37 1522.84 1857.37 1639.34 2058.87 1580.84" />
			<polygon points="1996.37 1533.84 1974.87 1507.84 1903.37 1564.34 1996.37 1533.84" />
			<polygon points="1880.37 1633.34 2198.37 1737.84 2038.87 1586.34 1880.37 1633.34" />
			<polygon points="2058.87 1580.84 2158.37 1661.34 2030.87 1663.84 2058.87 1580.84" />
			<polygon points="2158.37 1661.34 2220.37 1719.84 2114.87 1845.84 2158.37 1661.34" />
			<polygon points="1730.87 1617.34 1770.87 1649.84 1803.87 1538.34 1730.87 1617.34" />
			<polygon points="1766.37 1639.34 1854.87 1721.34 1831.54 1561.51 1766.37 1639.34" />
			<polygon points="1865.37 1681.84 2115.87 1845.34 1903.37 1564.34 1865.37 1681.84" />
			<polygon points="1854.87 1721.34 1885.37 1694.84 1865.37 1681.84 1854.87 1721.34" />
			<polygon points="2115.87 1845.34 2251.87 1814.34 2239.87 1756.84 2115.87 1845.34" />
			<polygon points="2220.37 1719.84 2239.87 1756.84 2108.87 1789.34 2220.37 1719.84" />
			<polygon points="2115.87 1845.34 2140.87 1976.84 2176.87 1905.34 2115.87 1845.34" />
			<polygon points="2140.87 1976.84 2232.87 2090.84 2176.87 1905.34 2140.87 1976.84" />
			<polygon points="2251.87 1814.34 2177.37 2020.84 2346.37 2033.84 2251.87 1814.34" />
			<polygon points="2120.37 1874.34 2184.87 1838.34 2269.87 1861.34 2120.37 1874.34" />
			<polygon points="2346.37 2033.84 2380.87 2092.84 2177.37 2020.84 2346.37 2033.84" />
			<polygon points="1435.37 1221.34 1416.71 1258.01 1417.37 1274.01 1435.37 1221.34" />
			<polygon points="1417.37 1277.34 1428.37 1294.84 1461.37 1239.84 1417.37 1277.34" />
			<polygon points="1428.37 1294.84 1435.37 1301.34 1478.37 1252.34 1428.37 1294.84" />
			<polygon points="1435.37 1301.34 1446.37 1316.34 1470.04 1278.68 1435.37 1301.34" />
			<polygon points="1446.37 1315.84 1483.87 1294.34 1485.87 1323.84 1446.37 1315.84" />
			<polygon points="1446.37 1316.34 1452.87 1326.34 1485.87 1323.84 1446.37 1316.34" />
			<polygon points="1483.87 1294.34 1525.37 1285.84 1485.87 1323.84 1483.87 1294.34" />
			<polygon points="1537.37 1274.68 1523.87 1314.34 1466.87 1280.34 1537.37 1274.68" />
			<polygon points="1472.71 1538.68 1429.15 1789.18 1530.71 1732.68 1472.71 1538.68" />
			<polygon points="1472.71 1538.68 1380.71 1679.34 1556.71 1652.01 1472.71 1538.68" />
			<polygon points="1380.71 1679.34 1325.37 1706.68 1429.37 1793.34 1380.71 1679.34" />
			<polygon points="1424.71 1610.01 1420.71 1598.68 1360.71 1623.34 1424.71 1610.01" />
			<polygon points="1360.71 1623.34 1319.37 1707.34 1380.71 1679.34 1360.71 1623.34" />
			<polygon points="1420.71 1598.68 1363.37 1504.01 1360.71 1623.34 1420.71 1598.68" />
			<polygon points="1363.37 1504.01 1278.04 1550.68 1360.71 1623.34 1363.37 1504.01" />
			<polygon points="1278.04 1550.68 1248.71 1626.68 1319.37 1707.34 1278.04 1550.68" />
			<polygon points="1363.37 1504.01 1122.04 1356.68 1278.04 1550.68 1363.37 1504.01" />
			<polygon points="1122.04 1356.68 1066.04 1378.01 1286.04 1502.01 1122.04 1356.68" />
			<polygon points="1066.04 1378.01 1045.37 1438.68 1088.04 1462.68 1066.04 1378.01" />
			<polygon points="1087.37 1468.01 1100.04 1430.01 1256.71 1600.01 1087.37 1468.01" />
			<polygon points="1117.37 1491.34 1248.71 1626.68 1278.04 1550.68 1117.37 1491.34" />
			<polygon points="1164.71 1382.01 1165.37 1370.01 1066.71 1317.34 1164.71 1382.01" />
			<polygon points="1165.37 1370.01 1150.04 1304.01 1038.04 1302.01 1165.37 1370.01" />
			<polygon points="1150.04 1304.01 1167.37 1341.34 1165.37 1370.01 1150.04 1304.01" />
			<polygon points="1038.04 1302.01 952.71 1298.01 969.37 1318.01 1038.04 1302.01" />
			<polygon points="952.71 1298.01 850.71 1328.01 830.71 1352.68 952.71 1298.01" />
			<polygon points="830.71 1352.68 860.71 1388.01 952.71 1298.01 830.71 1352.68" />
			<polygon points="860.71 1388.01 907.37 1404.68 897.37 1351.34 860.71 1388.01" />
			<polygon points="896.71 1352.68 1066.04 1378.01 969.37 1318.01 896.71 1352.68" />
			<polygon points="1038.04 1302.01 1066.04 1378.01 969.37 1318.01 1038.04 1302.01" />
			<polygon points="1054.71 1383.34 983.37 1391.34 1030.71 1462.01 1054.71 1383.34" />
			<polygon points="907.37 1404.68 999.37 1417.34 896.71 1352.68 907.37 1404.68" />
			<polygon points="2425.37 2148.68 2439.37 2204.01 2496.04 2226.68 2425.37 2148.68" />
			<polygon points="2425.37 2148.68 2472.04 2159.34 2439.37 2204.01 2425.37 2148.68" />
			<polygon points="2472.04 2159.34 2533.37 2146.01 2511.37 2218.68 2472.04 2159.34" />
			<polygon points="2431.37 2243.34 2439.37 2204.01 2496.04 2226.68 2431.37 2243.34" />
			<polygon points="2496.04 2226.68 2539.37 2204.01 2472.04 2159.34 2496.04 2226.68" />
			<polygon points="2539.37 2204.01 2600.04 2149.34 2533.37 2146.01 2539.37 2204.01" />
			<polygon points="2399.37 2300.01 2431.37 2243.34 2510.04 2270.68 2399.37 2300.01" />
			<polygon points="2510.04 2270.68 2571.37 2220.01 2539.37 2204.01 2510.04 2270.68" />
			<polygon points="2600.04 2149.34 2607.37 2158.01 2571.37 2220.01 2600.04 2149.34" />
			<polygon points="2424.7 2270.01 2444.7 2282.01 2450.04 2251.34 2424.7 2270.01" />
			<polygon points="2444.7 2282.01 2464.04 2262.68 2450.04 2251.34 2444.7 2282.01" />
			<polygon points="2456.37 2251.34 2471.04 2261.01 2483.37 2256.34 2456.37 2251.34" />
			<polygon points="2455.7 2248.34 2470.37 2243.68 2483.37 2256.34 2455.7 2248.34" />
			<polygon points="2430.7 2290.01 2444.7 2302.01 2456.04 2279.34 2430.7 2290.01" />
			<polygon points="2444.7 2302.01 2461.04 2292.34 2456.04 2279.34 2444.7 2302.01" />
			<polygon points="2411.7 2297.34 2428.04 2311.34 2424.37 2289.34 2411.7 2297.34" />
			<polygon points="2428.04 2311.34 2434.04 2304.01 2424.37 2289.34 2428.04 2311.34" />
			<polygon points="2492.37 2269.34 2513.37 2279.01 2506.04 2261.34 2492.37 2269.34" />
			<polygon points="2511.7 2261.68 2526.04 2271.34 2532.7 2251.68 2511.7 2261.68" />
			<polygon points="2526.04 2271.34 2537.04 2265.01 2532.7 2251.68 2526.04 2271.34" />
			<polygon points="2518.04 2233.01 2532.04 2238.34 2542.7 2216.34 2518.04 2233.01" />
			<polygon points="2529.7 2236.01 2543.7 2229.34 2535.04 2221.01 2529.7 2236.01" />
			<polygon points="2541.04 2246.01 2551.37 2253.01 2560.37 2242.34 2541.04 2246.01" />
			<polygon points="2541.04 2246.01 2560.37 2242.34 2558.37 2229.68 2541.04 2246.01" />
			<polygon points="1643.71 979.34 1646.1 868.01 1759.13 819.1 1643.71 979.34" />
			<polygon points="1649.36 927.78 1610.24 901.7 1602.63 862.57 1649.36 927.78" />
			<polygon points="1602.63 862.57 1628.71 811.49 1678.71 784.32 1602.63 862.57" />
			<polygon points="1678.71 784.32 1643.93 920.17 1755.87 752.8 1678.71 784.32" />
			<polygon points="1678.71 784.32 1751.53 732.15 1813.48 764.76 1678.71 784.32" />
			<polygon points="1751.53 732.15 1745.01 716.93 1810.55 726.64 1751.53 732.15" />
			<polygon points="1688.49 795.19 1668.93 757.15 1539.59 758.24 1688.49 795.19" />
			<polygon points="1539.59 758.24 1641.76 853.88 1652.62 784.32 1539.59 758.24" />
			<polygon points="1539.59 758.24 1514.6 786.49 1563.5 846.27 1539.59 758.24" />
			<polygon points="1625.45 864.75 1563.5 846.27 1628.71 811.49 1625.45 864.75" />
			<polygon points="1539.59 758.24 1521.12 722.37 1464.6 734.32 1539.59 758.24" />
			<polygon points="1525.47 806.06 1496.12 797.36 1464.6 734.32 1525.47 806.06" />
			<polygon points="1464.6 734.32 1434.17 743.02 1411.35 776.71 1464.6 734.32" />
			<polygon points="1411.35 776.71 1423.3 788.67 1464.6 734.32 1411.35 776.71" />
			<polygon points="1430.91 784.32 1465.69 765.84 1450.47 752.8 1430.91 784.32" />
			<polygon points="1452.65 771.28 1503.73 759.32 1464.6 734.32 1452.65 771.28" />
			<polygon points="1773.26 733.24 1806.96 662.59 1835.21 770.19 1773.26 733.24" />
			<polygon points="1785.22 699.55 1800.43 576.73 1850.43 515.87 1785.22 699.55" />
			<polygon points="1800.43 576.73 1886.3 673.46 1942.81 585.43 1800.43 576.73" />
			<polygon points="1850.43 515.87 2055.84 607.16 1955.85 502.83 1850.43 515.87" />
			<polygon points="1850.43 515.87 1904.77 491.96 1966.72 514.78 1850.43 515.87" />
			<polygon points="1926.51 531.09 1942.81 585.43 2033.02 628.9 1926.51 531.09" />
			<polygon points="2033.02 628.9 2055.84 607.16 1967.81 535.43 2033.02 628.9" />
			<polygon points="1850.43 633.25 1824.34 623.47 1813.48 649.55 1850.43 633.25" />
			<polygon points="1813.48 649.55 1835.21 697.37 1849.34 651.73 1813.48 649.55" />
			<polygon points="1837.39 725.63 1904.77 824.53 1947.16 803.88 1837.39 725.63" />
			<polygon points="1949.6 806.99 1959.02 788.13 1924.33 783.23 1949.6 806.99" />
			<polygon points="1959.65 787.51 1967.81 761.5 1924.33 783.23 1959.65 787.51" />
			<polygon points="1953.68 749.54 1987.37 769.1 1989.55 682.16 1953.68 749.54" />
			<polygon points="1923.25 668.03 1989.55 682.16 1967.81 724.54 1923.25 668.03" />
			<polygon points="1989.55 682.16 2014.54 696.28 1988.46 714.76 1989.55 682.16" />
			<polygon points="2014.54 696.28 2033.02 628.9 1913.47 627.81 2014.54 696.28" />
			<polygon points="1886.3 673.46 1924.33 783.23 1846.08 706.07 1886.3 673.46" />
			<polygon points="2232.87 2090.84 2349.59 2198.72 2392.22 2183.37 2425.37 2148.68 2232.87 2090.84" />
			<polygon points="2380.87 2092.84 2425.37 2148.68 2343.37 2165.34 2380.87 2092.84" />
			<polygon points="2343.37 2165.34 2336.7 2206.01 2386.7 2200.68 2343.37 2165.34" />
			<polygon points="2399.37 2300.01 2343.37 2311.34 2431.37 2243.34 2399.37 2300.01" />
			<polygon points="2343.37 2311.34 2303.37 2265.34 2348.7 2236.68 2343.37 2311.34" />
			<polygon points="2348.7 2236.68 2431.37 2243.34 2386.7 2200.68 2348.7 2236.68" />
			<polygon points="2303.37 2265.34 2304.04 2193.34 2348.7 2236.68 2303.37 2265.34" />
			<polygon points="2304.04 2193.34 2310.7 2164.01 2338.7 2189.34 2304.04 2193.34" />
			<polygon points="2348.7 2236.68 2399.37 2300.01 2416.7 2269.34 2348.7 2236.68" />
			<polygon points="1878.7 1393.34 1974.87 1507.84 1857.37 1471.34 1878.7 1393.34" />
			<polygon points="2058.87 1580.84 1996.37 1533.84 1962.7 1542.68 2058.87 1580.84" />
			<polygon points="1530.71 1732.68 1640.71 1668.01 1590.04 1642.01 1530.71 1732.68" />
			<polygon points="1828.46 583.49 1850.43 515.87 1942.81 585.43 1828.46 583.49" />
			<polygon points="1850.43 515.87 1943.96 598.49 2055.84 607.16 1850.43 515.87" />

		</g>
	</svg>

	<svg id="soccer2" opacity="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2538.46 2045.16">
		<title>
			soccer 2
		</title>
		<g class="soccer2_fill" data-name="FILL" style="fill:#fff;opacity:0.30000001192092896">
			<polygon points="1669.27 544.27 1797.94 654.94 1865.94 535.61 1669.27 544.27" />
			<polygon points="1647.94 687.61 1786.61 741.61 1797.94 654.94 1647.94 687.61" />
			<polygon points="1669.27 544.27 1845.27 386.94 1865.94 535.61 1669.27 544.27" />
			<polygon points="1845.27 386.94 1917.27 432.27 1865.94 535.61 1845.27 386.94" />
			<polygon points="1865.94 535.61 1869.27 606.94 1837.27 586.94 1865.94 535.61" />
			<polygon points="1985.94 562.27 1906.61 628.27 1869.27 606.94 1985.94 562.27" />
			<polygon points="1869.27 606.94 1970.61 514.27 1985.94 562.27 1869.27 606.94" />
			<polygon points="1926.61 554.94 1917.27 432.27 1970.61 514.27 1926.61 554.94" />
			<polygon points="1926.61 554.94 1893.27 518.27 1869.27 606.94 1926.61 554.94" />
			<polygon points="1865.94 535.61 1917.27 432.27 1893.27 518.27 1865.94 535.61" />
			<polygon points="1733.94 317.61 1871.94 362.94 1917.27 432.27 1733.94 317.61" />
			<polygon points="1845.27 386.94 1741.27 375.61 1733.94 317.61 1845.27 386.94" />
			<polygon points="1845.27 386.94 1669.27 544.27 1741.27 375.61 1845.27 386.94" />
			<polygon points="1719.94 427.61 1571.94 442.94 1669.27 544.27 1719.94 427.61" />
			<polygon points="1647.94 687.61 1337.27 635.61 1571.94 442.94 1647.94 687.61" />
			<polygon points="1413.27 424.27 1229.94 589.61 1337.27 635.61 1413.27 424.27" />
			<polygon points="1229.94 589.61 1305.94 652.27 1337.27 635.61 1229.94 589.61" />
			<polygon points="1489.27 315.61 1515.94 398.27 1571.94 442.94 1489.27 315.61" />
			<polygon points="1440.61 548.94 1413.27 424.27 1489.27 315.61 1440.61 548.94" />
			<polygon points="1413.27 424.27 1381.94 380.94 1489.27 315.61 1413.27 424.27" />
			<polygon points="1413.27 424.27 1313.94 405.61 1381.94 380.94 1413.27 424.27" />
			<polygon points="1229.94 589.61 1201.94 549.61 1313.94 405.61 1229.94 589.61" />
			<polygon points="1679.94 420.94 1717.27 309.61 1733.94 317.61 1679.94 420.94" />
			<polygon points="1713.94 250.94 1723.27 256.27 1717.27 309.61 1713.94 250.94" />
			<polygon points="1663.94 354.94 1701.27 305.61 1713.94 250.94 1663.94 354.94" />
			<polygon points="1734.61 174.27 1700.61 172.27 1713.94 250.94 1734.61 174.27" />
			<polygon points="1713.94 226.94 1720.61 188.27 1743.94 172.27 1713.94 226.94" />
			<polygon points="1747.94 236.27 1755.94 179.61 1743.94 172.27 1747.94 236.27" />
			<polygon points="1713.94 226.94 1723.27 256.27 1747.94 236.27 1713.94 226.94" />
			<polygon points="1635.94 10.27 1735.94 76.94 1734.61 174.27 1635.94 10.27" />
			<polygon points="1692.61 36.94 1653.27 115.61 1720.61 151.61 1692.61 36.94" />
			<polygon points="1625.94 0.94 1720.61 51.61 1729.27 108.27 1625.94 0.94" />
			<polygon points="1520.61 114.94 1589.94 136.27 1653.27 115.61 1520.61 114.94" />
			<polygon points="1589.94 112.94 1653.27 115.61 1627.27 0.94 1589.94 112.94" />
			<polygon points="1589.94 112.94 1520.61 114.94 1627.27 0.94 1589.94 112.94" />
			<polygon points="1508.61 105.61 1539.94 39.61 1615.94 12.94 1508.61 105.61" />
			<polygon points="1508.61 105.61 1503.27 146.94 1520.61 114.94 1508.61 105.61" />
			<polygon points="1517.27 120.27 1627.27 0.94 1508.61 105.61 1517.27 120.27" />
			<polygon points="1503.22 146.31 1513.94 198.27 1509.13 136.77 1503.22 146.31" />
			<polygon points="1565.87 278.87 1576.32 284.77 1577.22 216.22 1565.87 278.87" />
			<polygon points="1571.32 204.87 1520.02 182.63 1513.94 198.27 1571.32 204.87" />
			<polygon points="1666.2 192.61 1648.05 178.54 1594.93 205.32 1666.2 192.61" />
			<polygon points="1537.26 291.11 1546.56 277.82 1561.97 350.89 1537.26 291.11" />
			<polygon points="1537.26 291.11 1519.99 252.58 1546.56 277.82 1537.26 291.11" />
			<polygon points="1513.94 198.27 1519.72 197.85 1519.99 252.58 1513.94 198.27" />
			<polygon points="1177.9 675.28 1229.88 711.07 1356.13 578.74 1177.9 675.28" />
			<polygon points="1211.65 687.44 1147.89 640.94 1146.84 640.18 1234.61 508.53 1211.65 687.44" />
			<polygon points="1224.48 699.59 1129.96 686.76 1146.84 640.18 1224.48 699.59" />
			<polygon points="1158.99 794.11 1220.43 805.58 1228.53 704.31 1158.99 794.11" />
			<polygon points="1138.74 999.35 1184.65 994.62 1220.43 805.58 1138.74 999.35" />
			<polygon points="1144.14 671.91 1192.75 668.53 1167.1 997.32 1144.14 671.91" />
			<polygon points="1106.33 842.04 1129.29 676.63 1158.99 680.69 1106.33 842.04" />
			<polygon points="1116.46 1000.02 1117.14 746.85 1204.9 756.3 1116.46 1000.02" />
			<polygon points="1138.07 1064.16 1197.48 1064.16 1190.05 992.59 1138.07 1064.16" />
			<polygon points="1107.68 1051.33 1116.46 1000.02 1186.67 1003.4 1107.68 1051.33" />
			<polygon points="1109.03 1033.1 1127.26 1060.11 1184.65 1056.06 1109.03 1033.1" />
			<polygon points="1170.47 1148.55 1211.65 1144.5 1199.5 1070.23 1170.47 1148.55" />
			<polygon points="1169.12 1197.16 1198.15 1195.13 1211.65 1144.5 1169.12 1197.16" />
			<polygon points="1182.62 1225.51 1163.72 1220.79 1180.6 1137.07 1182.62 1225.51" />
			<polygon points="1163.72 1220.79 1175.66 1229.02 1197.56 1189.54 1163.72 1220.79" />
			<polygon points="1069.49 1109.59 1132.86 1207.13 1176.32 1142.43 1069.49 1109.59" />
			<polygon points="1147.13 1174.28 1069.49 1109.59 1107.68 1051.33 1147.13 1174.28" />
			<polygon points="1159.4 1160.35 1098.69 1098.31 1199.55 1070.11 1159.4 1160.35" />
			<polygon points="1103.67 1220.07 1131.87 1226.7 1142.15 1184.23 1103.67 1220.07" />
			<polygon points="1152.1 1160.02 1106.65 1214.76 1120.59 1141.11 1152.1 1160.02" />
			<polygon points="1104.66 1253.57 1126.23 1254.24 1133.2 1221.39 1104.66 1253.57" />
			<polygon points="1104 1246.27 1123.57 1267.18 1126.89 1251.92 1104 1246.27" />
			<polygon points="1106.32 1217.41 1105.33 1267.51 1123.57 1267.18 1106.32 1217.41" />
			<polygon points="1061.86 1174.95 1053.9 1151.72 1069.49 1109.59 1061.86 1174.95" />
			<polygon points="1072.48 1103.62 1090.4 1116.89 1059.21 1161.01 1072.48 1103.62" />
			<polygon points="1087.74 1199.83 1102.67 1214.09 1115.94 1139.78 1087.74 1199.83" />
			<polygon points="1115.94 1139.78 1088.74 1195.85 1085.09 1132.15 1115.94 1139.78" />
			<polygon points="1064.52 1173.62 1073.14 1188.55 1087.41 1186.23 1064.52 1173.62" />
			<polygon points="1087.41 1186.23 1085.09 1132.15 1064.52 1173.62 1087.41 1186.23" />
			<polygon points="1356.13 578.74 1776.94 909.61 1786.61 741.61 1356.13 578.74" />
			<polygon points="1768.94 708.61 1378.94 960.61 1337.27 635.61 1768.94 708.61" />
			<polygon points="1690.94 941.61 1349.94 1118.61 1405.94 804.61 1690.94 941.61" />
			<polygon points="1769.94 937.61 1506.94 953.61 1545.94 791.61 1769.94 937.61" />
			<polygon points="1558.94 1180.61 1375.94 1182.61 1349.94 1118.61 1558.94 1180.61" />
			<polygon points="1385.94 1030.61 1558.94 1180.61 1800.94 1016.61 1385.94 1030.61" />
			<polygon points="1427.94 984.61 1591.94 1095.61 1782.94 960.61 1427.94 984.61" />
			<polygon points="1953.94 1087.61 1558.94 1180.61 1855.94 1001.61 1953.94 1087.61" />
			<polygon points="1858.94 1401.61 2093.94 1270.61 1953.94 1087.61 1858.94 1401.61" />
			<polygon points="1953.94 1087.61 1767.94 1241.61 2012.94 1188.61 1953.94 1087.61" />
			<polygon points="1486.94 1219.61 1699.94 1350.61 1799.94 1188.61 1486.94 1219.61" />
			<polygon points="1747.94 1314.61 1858.94 1401.61 1960.94 1281.61 1747.94 1314.61" />
			<polygon points="1558.94 1180.61 1810.94 978.61 1855.94 1001.61 1558.94 1180.61" />
			<polygon points="1446.94 1329.61 1375.94 1182.61 1712.94 1222.61 1446.94 1329.61" />
			<polygon points="1708.94 1284.61 1523.94 1478.61 1436.94 1305.61 1708.94 1284.61" />
			<polygon points="1604.94 1290.61 1716.94 1409.61 1721.94 1314.61 1604.94 1290.61" />
			<polygon points="1681.94 1548.61 1762.94 1471.61 1716.94 1409.61 1681.94 1548.61" />
			<polygon points="1523.94 1478.61 1610.94 1588.61 1733.94 1477.61 1523.94 1478.61" />
			<polygon points="1446.94 1329.61 1477.94 1314.61 1382.94 1180.61 1446.94 1329.61" />
			<polygon points="1446.94 1329.61 1523.94 1478.61 1477.94 1314.61 1446.94 1329.61" />
			<polygon points="2012.94 1314.61 2108.94 1367.61 2084.94 1276.61 2012.94 1314.61" />
			<polygon points="2157.94 1478.61 2149.94 1416.61 2108.94 1367.61 2157.94 1478.61" />
			<polygon points="2004.94 1496.61 2071.94 1522.61 2157.94 1478.61 2004.94 1496.61" />
			<polygon points="2012.94 1313.61 2004.94 1496.61 1875.94 1394.61 2012.94 1313.61" />
			<polygon points="1935.94 1358.61 2012.94 1313.61 2157.94 1478.61 1935.94 1358.61" />
			<polygon points="2200.94 1688.61 2188.94 1557.61 2157.94 1478.61 2200.94 1688.61" />
			<polygon points="2071.94 1522.61 2089.94 1561.61 2157.94 1478.61 2071.94 1522.61" />
			<polygon points="2089.94 1561.61 2004.94 1496.61 2071.94 1522.61 2089.94 1561.61" />
			<polygon points="2089.94 1561.61 2043.94 1593.61 2004.94 1496.61 2089.94 1561.61" />
			<polygon points="2145.94 1597.61 2019.94 1637.61 2019.94 1540.61 2145.94 1597.61" />
			<polygon points="2089.94 1561.61 2145.94 1597.61 2188.94 1557.61 2089.94 1561.61" />
			<polygon points="2145.94 1597.61 2034.94 1700.61 2019.94 1637.61 2145.94 1597.61" />
			<polygon points="2145.94 1597.61 2072.94 1730.61 2034.94 1700.61 2145.94 1597.61" />
			<polygon points="2178.94 1567.61 2200.94 1688.61 2145.94 1597.61 2178.94 1567.61" />
			<polygon points="2145.94 1597.61 2072.94 1730.61 2200.94 1688.61 2145.94 1597.61" />
			<polygon points="2072.94 1730.61 2197.94 1890.61 2200.94 1688.61 2072.94 1730.61" />
			<polygon points="2200.94 1688.61 2081.94 1856.61 2072.94 1730.61 2200.94 1688.61" />
			<polygon points="2188.94 1789.61 2088.94 1927.61 2077.94 1777.61 2188.94 1789.61" />
			<polygon points="2088.94 1927.61 2126.94 1946.61 2197.94 1890.61 2088.94 1927.61" />
			<polygon points="2233.94 1897.61 2221.94 1885.61 2197.94 1890.61 2233.94 1897.61" />
			<polygon points="2394.94 1989.61 2368.94 1955.61 2233.94 1897.61 2394.94 1989.61" />
			<polygon points="2197.94 1890.61 2275.94 2002.61 2394.94 1989.61 2197.94 1890.61" />
			<polygon points="2197.94 1890.61 2160.94 1981.61 2275.94 2002.61 2197.94 1890.61" />
			<polygon points="2126.94 1946.61 2084.94 1996.61 2160.94 1981.61 2126.94 1946.61" />
			<polygon points="2126.94 1946.61 2084.94 1996.61 2088.94 1927.61 2126.94 1946.61" />
			<polygon points="2084.94 1996.61 2069.94 1965.61 2088.94 1927.61 2084.94 1996.61" />
			<polygon points="2273.94 2003.61 2396.94 2006.61 2394.94 1989.61 2273.94 2003.61" />
			<polygon points="2160.94 1981.61 2151.94 2001.61 2273.94 2003.61 2160.94 1981.61" />
			<polygon points="2160.94 1981.61 2084.94 1996.61 2151.94 2001.61 2160.94 1981.61" />
			<polygon points="1798.94 1653.61 1824.94 1594.61 1762.94 1471.61 1798.94 1653.61" />
			<polygon points="1762.94 1700.61 1704.94 1545.61 1798.94 1653.61 1762.94 1700.61" />
			<polygon points="1692.94 1710.61 1727.94 1718.61 1762.94 1700.61 1692.94 1710.61" />
			<polygon points="1704.94 1545.61 1704.94 1707.61 1610.94 1588.61 1704.94 1545.61" />
			<polygon points="1523.94 1683.61 1620.94 1715.61 1692.94 1710.61 1523.94 1683.61" />
			<polygon points="1542.94 1562.61 1620.94 1715.61 1610.94 1588.61 1542.94 1562.61" />
			<polygon points="1523.94 1683.61 1542.94 1562.61 1588.94 1565.61 1523.94 1683.61" />
			<polygon points="1523.94 1683.61 1487.94 1617.61 1542.94 1562.61 1523.94 1683.61" />
			<polygon points="1620.94 1715.61 1610.94 1588.61 1692.94 1710.61 1620.94 1715.61" />
			<polygon points="1489.94 1542.61 1525.94 1546.61 1542.94 1562.61 1489.94 1542.61" />
			<polygon points="1515.94 1821.61 1460.94 1591.61 1489.94 1542.61 1515.94 1821.61" />
			<polygon points="1515.94 1821.61 1620.94 1715.61 1648.94 1752.61 1515.94 1821.61" />
			<polygon points="1546.94 1790.61 1523.94 1683.61 1623.94 1757.61 1546.94 1790.61" />
			<polygon points="1568.94 1714.61 1505.94 1733.61 1595.94 1740.61 1568.94 1714.61" />
			<polygon points="1559.94 1778.61 1511.94 1752.61 1579.94 1758.61 1559.94 1778.61" />
			<polygon points="1764.94 1823.61 1722.94 1776.61 1648.94 1752.61 1764.94 1823.61" />
			<polygon points="1515.94 1821.61 1789.94 1896.61 1764.94 1823.61 1515.94 1821.61" />
			<polygon points="1578.94 1787.61 1758.94 1993.61 1789.94 1896.61 1578.94 1787.61" />
			<polygon points="1578.94 1787.61 1689.94 2037.61 1758.94 1993.61 1578.94 1787.61" />
			<polygon points="1648.94 1752.61 1604.94 2044.61 1689.94 2037.61 1648.94 1752.61" />
			<polygon points="1764.94 1823.61 1528.94 2000.61 1604.94 2044.61 1764.94 1823.61" />
			<polygon points="1789.94 1896.61 1488.94 1913.61 1528.94 2000.61 1789.94 1896.61" />
			<polygon points="1789.94 1896.61 1515.94 1821.61 1488.94 1913.61 1789.94 1896.61" />
			<polygon points="1506.94 1912.61 1570.94 1855.61 1609.94 1905.61 1506.94 1912.61" />
			<polygon points="1506.94 1912.61 1558.94 1962.61 1609.94 1905.61 1506.94 1912.61" />
			<polygon points="1686.94 1859.61 1731.94 1924.61 1717.94 1990.61 1686.94 1859.61" />
			<polygon points="1686.94 1859.61 1669.94 2013.61 1717.94 1990.61 1686.94 1859.61" />
			<polygon points="1669.94 2013.61 1642.94 1888.61 1686.94 1859.61 1669.94 2013.61" />
			<polygon points="1722.94 1776.61 1644.94 1798.61 1764.94 1823.61 1722.94 1776.61" />
			<polygon points="1614.44 277.11 1591.94 293.11 1576.32 284.77 1614.44 277.11" />
			<polygon points="1598.44 279.11 1590.44 228.61 1614.44 277.11 1598.44 279.11" />
			<polygon points="1705.94 204.11 1633.44 242.61 1590.44 228.61 1705.94 204.11" />
			<polygon points="1599.94 231.61 1626.94 204.61 1676.94 219.11 1599.94 231.61" />
			<polygon points="1525.94 219.11 1542.44 208.61 1577.22 216.22 1525.94 219.11" />
			<polygon points="1540.44 217.61 1553.44 240.11 1577.22 216.22 1540.44 217.61" />
			<polygon points="1713.94 250.94 1653.44 275.61 1682.94 315.61 1713.94 250.94" />
			<polygon points="1682.94 315.61 1614.44 277.11 1653.44 275.61 1682.94 315.61" />
			<polygon points="1569.44 372.61 1619.44 381.11 1663.94 354.94 1569.44 372.61" />
			<polygon points="1569.94 307.61 1602.44 304.61 1638.44 317.11 1569.94 307.61" />
			<polygon points="1569.94 307.61 1596.44 324.61 1626.94 316.11 1569.94 307.61" />
			<polygon points="1638.44 317.11 1610.44 349.61 1598.44 332.11 1638.44 317.11" />
			<polygon points="1598.44 332.11 1561.97 350.89 1610.44 349.61 1598.44 332.11" />
			<polygon points="1569.44 372.61 1570.44 321.61 1598.44 332.11 1569.44 372.61" />
			<polygon points="1569.44 372.61 1537.94 295.11 1489.27 315.61 1569.44 372.61" />
			<polygon points="1977.27 696.27 1925.27 697.61 1869.27 606.94 1977.27 696.27" />
			<polygon points="1977.27 696.27 2026.61 652.94 1977.27 571.61 1977.27 696.27" />
			<polygon points="2162.61 976.94 2073.27 713.61 2026.61 652.94 2162.61 976.94" />
			<polygon points="2026.61 652.94 2049.27 906.27 1977.27 696.27 2026.61 652.94" />
			<polygon points="2107.94 1004.27 1969.27 801.61 1925.27 697.61 2107.94 1004.27" />
			<polygon points="2078.61 818.27 2107.94 1004.27 2162.61 976.94 2078.61 818.27" />
			<polygon points="2183.27 1045.61 2236.61 1041.61 2162.61 976.94 2183.27 1045.61" />
			<polygon points="2183.27 1045.61 2303.27 1115.61 2236.61 1041.61 2183.27 1045.61" />
			<polygon points="2273.94 1166.94 2293.27 1180.27 2303.27 1115.61 2273.94 1166.94" />
			<polygon points="2303.27 1115.61 2267.27 1108.94 2273.94 1166.94 2303.27 1115.61" />
			<polygon points="2267.27 1108.94 2183.27 1045.61 2269.28 1125.71 2267.27 1108.94" />
			<polygon points="2159.94 1086.11 2202.44 1073.11 2183.27 1045.61 2159.94 1086.11" />
			<polygon points="2162.61 976.94 2128.94 1059.61 2159.94 1086.11 2162.61 976.94" />
			<polygon points="2183.27 1045.61 2128.94 1059.61 2107.94 1004.27 2183.27 1045.61" />
			<polygon points="2236.44 1137.11 2248.44 1126.36 2242.94 1110.86 2236.44 1137.11" />
			<polygon points="2236.44 1137.11 2220.69 1124.11 2242.94 1110.86 2236.44 1137.11" />
			<polygon points="2202.44 1073.11 2159.94 1086.11 2220.69 1124.11 2202.44 1073.11" />
			<polygon points="2185.44 1091.86 2202.44 1073.11 2242.94 1110.86 2185.44 1091.86" />
			<polygon points="2252.44 1171.11 2260.44 1186.86 2277.19 1169.86 2252.44 1171.11" />
			<polygon points="2243.44 1163.61 2271.94 1143.36 2252.44 1171.11 2243.44 1163.61" />
			<polygon points="2245.44 1164.11 2242.69 1184.86 2258.19 1184.61 2245.44 1164.11" />
			<polygon points="2257.94 1153.11 2257.69 1113.86 2248.19 1159.36 2257.94 1153.11" />
		</g>
		<g class="soccer2_extra-line" data-name="Extra Line" style="fill:none;stroke:#fff">
			<path d="M81.61,1351.1L897.51,1600.8"></path>
			<path transform="rotate(-72.96 489.5 1475.8)" width="2" height="853.25" d="M488.5 1049.2 L490.5 1049.2 L490.5 1902.45 L488.5 1902.45 Z"></path>
			<path d="M1218.2,573.2L1056.9,337.61"></path>
			<path transform="rotate(-34.4 1137.5 455.53)" width="2" height="285.51" d="M1136.5 312.77 L1138.5 312.77 L1138.5 598.28 L1136.5 598.28 Z"></path>
			<path d="m292 1723.2a1.0161 1.0161 0 0 0-2 0.36l0.36 2v0.13a0.92 0.92 0 0 0 0.13 0.24l-1.16 1a1 1 0 0 0-0.31 1.07 1 1 0 0 0 0.19 0.34 1 1 0 0 0 1.41 0.11l1.52-1.29a1 1 0 0 0 0.12-1.41 1 1 0 0 0 0.07-0.52l-0.36-2z"></path>
			<path d="m320.39 1729.3a1 1 0 0 0-1.12 0.86 0.82 0.82 0 0 0 0 0.44 1 1 0 0 0 0.82 0.68l2 0.27a1.0084 1.0084 0 1 0 0.26-2z"></path>
			<path d="m303.43 1728a1.14 1.14 0 0 0 0 0.45 1 1 0 0 0 0.82 0.67l2 0.27a1.0084 1.0084 0 0 0 0.26-2l-2-0.26a1 1 0 0 0-1.08 0.87z"></path>
			<path d="m298.36 1728.4a1.0084 1.0084 0 0 0 0.26-2l-2-0.27a1 1 0 0 0-1.12 0.86 1.14 1.14 0 0 0 0 0.45 1 1 0 0 0 0.82 0.67z"></path>
			<path d="m312.22 1730.2 2 0.27a1.0084 1.0084 0 0 0 0.26-2l-2-0.26a1 1 0 0 0-1.12 0.86 0.82 0.82 0 0 0 0 0.44 1 1 0 0 0 0.86 0.69z"></path>
			<path d="m290.59 1715.4a1.0161 1.0161 0 1 0-2 0.36l0.36 2v0.13a1.0005 1.0005 0 1 0 1.94-0.49l-0.36-2z"></path>
			<path d="m282.91 1684-26.91 23 7.9 43.21 40.68 5.66 0.31-0.27 27.2-23.27-7.9-43.21-39.88-5.55a1 1 0 0 0-0.69-0.14h-0.07a0.93 0.93 0 0 0-0.64 0.57zm0.29 2.17v0.22a1 1 0 0 0 1.93-0.5l-0.07-0.42 37.62 5.24 7.32 39.89-1.66-0.22a1 1 0 0 0-1.12 0.86 0.82 0.82 0 0 0 0 0.44 1 1 0 0 0 0.82 0.68l1.09 0.15-25.13 21.49-37.22-5.18 1-0.82a1.0006 1.0006 0 1 0-1.29-1.53l-1.21 1-7.28-39.79z"></path>
			<path d="m286.28 1691.8a1.0161 1.0161 0 1 0-2 0.36l0.36 2a0.28 0.28 0 0 0 0 0.13 1 1 0 0 0 1.93-0.49l-0.36-2z"></path>
			<path d="m289.11 1707.5a1.0161 1.0161 0 0 0-2 0.36l0.36 2v0.13a1 1 0 0 0 1.93-0.49l-0.36-2z"></path>
			<path d="m287.72 1699.7a1.0161 1.0161 0 0 0-2 0.36l0.36 2a0.28 0.28 0 0 0 0 0.13 1 1 0 0 0 1.93-0.49l-0.36-2z"></path>
			<path d="m280.1 1736.2a1 1 0 0 0-1.41-0.12l-1.53 1.3a1 1 0 1 0 1.3 1.52l1.52-1.29a1 1 0 0 0 0.12-1.41z"></path>
			<path d="m286.19 1731a1 1 0 0 0-1.41-0.12l-1.52 1.3a1 1 0 0 0-0.3 1.07 0.88 0.88 0 0 0 0.19 0.34 1 1 0 0 0 1.4 0.11l1.53-1.29a1 1 0 0 0 0.11-1.41z"></path>
			<path d="m274 1741.3a1 1 0 0 0-1.41-0.12l-1.52 1.3a1 1 0 0 0-0.3 1.08 1.06 1.06 0 0 0 0.18 0.33 1 1 0 0 0 1.41 0.11l1.53-1.29a1 1 0 0 0 0.11-1.41z"></path>
			<path d="m937.94 1605.4a1.0098 1.0098 0 0 0-0.28 2l2 0.28h0.41l0.57 1.42a1.0028 1.0028 0 0 0 1.86-0.75l-0.75-1.85a1 1 0 0 0-1.3-0.56 0.92 0.92 0 0 0-0.48-0.22l-2-0.28z"></path>
			<path d="m952.62 1580.4a1 1 0 0 0 0.46 1.33 1 1 0 0 0 0.44 0.1 1 1 0 0 0 0.89-0.56l0.88-1.8a1.0018 1.0018 0 1 0-1.8-0.88z"></path>
			<path d="m946.07 1596.1a1 1 0 0 0 0.44 0.1 1 1 0 0 0 0.9-0.56l0.87-1.8 0.09-0.17a1 1 0 0 0-0.6-1.29 1 1 0 0 0-1.28 0.59l-0.88 1.8a1 1 0 0 0 0.46 1.33z"></path>
			<path d="m944.78 1601a1.0018 1.0018 0 0 0-1.8-0.88l-0.87 1.8a1 1 0 0 0 0.46 1.33 1.13 1.13 0 0 0 0.44 0.1 1 1 0 0 0 0.9-0.57z"></path>
			<path d="m950.94 1588.5 0.88-1.8a1 1 0 0 0-1.8-0.87l-0.88 1.79a1 1 0 0 0 0.47 1.33 0.91 0.91 0 0 0 0.43 0.1 1 1 0 0 0 0.9-0.55z"></path>
			<path d="m930 1604.3a1.0098 1.0098 0 0 0-0.28 2l2 0.28h0.14a1.0028 1.0028 0 0 0 0.15-2l-2-0.27z"></path>
			<path d="m897.81 1601.7 13.38 32.81 43.5 6.11 18.18-36.82-0.15-0.38-13.52-33.15-43.5-6.11-17.83 36.1a1 1 0 0 0-0.35 0.61v0.08a1 1 0 0 0 0.29 0.75zm2.2 0.49h0.22a1.0024 1.0024 0 1 0 0.14-2l-0.42-0.06 16.82-34 40.11 5.63-0.73 1.51a1 1 0 0 0 0.46 1.33 1 1 0 0 0 0.44 0.1 1 1 0 0 0 0.9-0.56l0.48-1 12.46 30.56-16.64 33.7-0.47-1.17a1 1 0 0 0-1.31-0.55 1 1 0 0 0-0.55 1.3l0.6 1.46-40-5.62z"></path>
			<path d="m906.28 1601a1.0098 1.0098 0 1 0-0.28 2l2 0.28h0.14a1.0024 1.0024 0 0 0 0.14-2l-2-0.27z"></path>
			<path d="m921 1604.1a1 1 0 0 0 0.86 1.14l2 0.28h0.14a1.0021 1.0021 0 0 0 0.13-2l-2-0.28a1 1 0 0 0-1.13 0.86z"></path>
			<path d="m914.19 1602.1a1.0098 1.0098 0 0 0-0.28 2l2 0.28h0.14a1.0028 1.0028 0 0 0 0.15-2l-2-0.28z"></path>
			<path d="m945.9 1622.1 0.75 1.86a1 1 0 0 0 0.93 0.62 0.94 0.94 0 0 0 0.37-0.07 1 1 0 0 0 0.55-1.3l-0.75-1.86a1 1 0 1 0-1.85 0.75z"></path>
			<path d="m942.9 1614.6 0.75 1.86a1 1 0 0 0 0.93 0.62 0.94 0.94 0 0 0 0.37-0.07 1 1 0 0 0 0.56-1.3l-0.75-1.85a1 1 0 1 0-1.85 0.75z"></path>
			<path d="m948.9 1629.5 0.75 1.85a1 1 0 0 0 1.3 0.56 1 1 0 0 0 0.54-1.31l-0.75-1.85a1 1 0 1 0-1.85 0.75z"></path>
			<path d="m992.35 299.62 16.65 48.62 46-10.18 20.56-18.89-16.28-47.41a1 1 0 0 0-0.21-0.93l-0.15-0.11v-0.17h-0.15a1 1 0 0 0-1.06 0.19l-0.08 0.07-44.69 9.89zm2.23 1.42 0.3-0.07a1 1 0 0 0 0.75-1.2 0.89 0.89 0 0 0-0.4-0.58l18.44-17 42.2-9.34a1 1 0 0 0 0.26 0.65 0.92 0.92 0 0 0 0.51 0.3 1 1 0 0 0 0.9-0.24l0.5-0.45 15.68 45.55-18.61 17.13-0.28-0.83a1 1 0 0 0-1.89 0.65l0.39 1.13-43.15 9.56z"></path>
			<path d="m1031.6 290.47a1 1 0 0 0-0.75 0.75 1 1 0 0 0 0.75 1.2 0.86 0.86 0 0 0 0.45 0l1.94-0.45a1.025 1.025 0 0 0-0.45-2l-2 0.45z"></path>
			<path d="m1045.8 284.4 1.47-1.36a1 1 0 0 0 0.06-1.41 1 1 0 0 0-1.41-0.05l-1.47 1.36a1 1 0 0 0-0.06 1.41 1.05 1.05 0 0 0 0.52 0.3 1 1 0 0 0 0.89-0.25z"></path>
			<path d="m1023.6 292.23a1 1 0 0 0 0 1.94 0.86 0.86 0 0 0 0.45 0l2-0.45a1 1 0 0 0 0.75-1.2 1 1 0 0 0-1.2-0.75z"></path>
			<path d="m1051.7 279 1.48-1.35a1.005 1.005 0 0 0-1.36-1.48l-1.47 1.36a1 1 0 0 0-0.06 1.41 0.92 0.92 0 0 0 0.51 0.3 1 1 0 0 0 0.9-0.24z"></path>
			<path d="m1008.1 295.83a1 1 0 0 0-0.75 1.2 1 1 0 0 0 0.76 0.75 0.82 0.82 0 0 0 0.44 0l2-0.45a1.0006 1.0006 0 1 0-0.45-1.95z"></path>
			<path d="m1000.3 297.64a1 1 0 0 0 0 1.95 1.14 1.14 0 0 0 0.45 0l2-0.45a1 1 0 0 0 0.75-1.2 1 1 0 0 0-1.2-0.75z"></path>
			<path d="m1015.9 294.06a1 1 0 0 0 0 1.95 1.14 1.14 0 0 0 0.45 0l2-0.45a1 1 0 0 0 0.75-1.2 1 1 0 0 0-1.2-0.75z"></path>
			<path d="m1048.4 319.19a1 1 0 0 0-0.63 1.27l0.65 1.89v0.13a1.0019 1.0019 0 0 0 1.85-0.77l-0.65-1.89a1 1 0 0 0-1.26-0.63z"></path>
			<path d="m1050.4 328 0.64 1.9a1 1 0 0 0 0.73 0.65 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.65-1.89a1 1 0 1 0-1.89 0.64z"></path>
			<path d="m1045.2 312.87 0.65 1.89a1 1 0 0 0 0.72 0.65 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.64-1.9a1.0009 1.0009 0 0 0-1.9 0.63z"></path>
			<path d="m1038 288.91a1 1 0 0 0-0.6 1.28l0.65 1.89a1 1 0 0 0 1.89-0.65l-0.47-1.39a1 1 0 0 0 0.39-0.21l1.47-1.36a1 1 0 0 0-1.33-1.47l-1.47 1.35a1.06 1.06 0 0 0-0.29 0.54h-0.24z"></path>
			<path d="m1040 297.71 0.65 1.9a1 1 0 0 0 0.72 0.65 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.64-1.89a1 1 0 0 0-1.9 0.61z"></path>
			<path d="m1042.6 305.29 0.65 1.9a1 1 0 0 0 0.72 0.65 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.64-1.89a1 1 0 0 0-1.9 0.61z"></path>
			<path d="m2417.5 434.85-21.06 84.21 74.49 27.88 46.42-7.88 20.53-82.1a1.65 1.65 0 0 0 0.56-1.52 1.62 1.62 0 0 0-0.11-0.28l0.07-0.29-0.24-0.09a1.69 1.69 0 0 0-1.67-0.72h-0.17l-72.4-27.06zm1.78 4 0.49 0.18a1.68 1.68 0 0 0 2.15-1 1.63 1.63 0 0 0 0-1.19l41.72-7.09 68.36 25.61a1.68 1.68 0 0 0 1.71 2.55l1.12-0.19-19.73 78.91-42.1 7.15 0.36-1.42a1.6917 1.6917 0 0 0-3.28-0.83l-0.49 2-69.91-26.15z"></path>
			<path d="m2479.1 458.85a1.69 1.69 0 0 0 0.38 1.75 1.47 1.47 0 0 0 0.63 0.41l3.18 1.15 0.22 0.08a1.6902 1.6902 0 1 0 0.93-3.25l-3.18-1.16a1.7 1.7 0 0 0-2.16 1.02z"></path>
			<path d="m2507.1 462.46 3.33-0.56a1.69 1.69 0 0 0-0.57-3.33l-3.33 0.56a1.69 1.69 0 0 0-1.38 1.95 1.58 1.58 0 0 0 0.45 0.89 1.68 1.68 0 0 0 1.5 0.49z"></path>
			<path d="m2466.4 454.23a1.7 1.7 0 0 0 0.38 1.76 1.76 1.76 0 0 0 0.63 0.41l3.18 1.15a1.69 1.69 0 0 0 1.15-3.17l-3.17-1.16a1.71 1.71 0 0 0-2.17 1.01z"></path>
			<path d="m2520.4 460.2 3.33-0.57a1.68 1.68 0 0 0 1.35-1.94 1.7 1.7 0 0 0-1.95-1.39l-3.33 0.57a1.8 1.8 0 0 0-0.89 0.45 1.69 1.69 0 0 0 1.46 2.88z"></path>
			<path d="m2443.2 444a1.69 1.69 0 0 0-1.79 2.77 1.76 1.76 0 0 0 0.63 0.41l3.18 1.15a1.6908 1.6908 0 1 0 1.15-3.18z"></path>
			<path d="m2430.5 439.39a1.71 1.71 0 0 0-1.74 0.37 1.69 1.69 0 0 0 0 2.39 1.79 1.79 0 0 0 0.63 0.42l3.18 1.15a1.6908 1.6908 0 1 0 1.15-3.18l-3.17-1.15z"></path>
			<path d="m2455.9 448.61a1.69 1.69 0 0 0-1.79 2.77 1.76 1.76 0 0 0 0.63 0.41l3.18 1.15a1.6908 1.6908 0 1 0 1.15-3.18l-3.16-1.15z"></path>
			<path d="m2476.7 515.36-0.82 3.28a1.69 1.69 0 0 0 0.42 1.59 1.79 1.79 0 0 0 0.8 0.46 1.68 1.68 0 0 0 2.05-1.23l0.83-3.27a1.6917 1.6917 0 0 0-3.28-0.83z"></path>
			<path d="m2473.4 528.41-0.82 3.27a1.71 1.71 0 0 0 0.42 1.6 1.79 1.79 0 0 0 0.8 0.46 1.7 1.7 0 0 0 2.05-1.23l0.83-3.27a1.69 1.69 0 0 0-1.22-2 1.71 1.71 0 0 0-2.06 1.17z"></path>
			<path d="m2480 502.23-0.82 3.28a1.05 1.05 0 0 0-0.06 0.24 1.6901 1.6901 0 0 0 3.33 0.58l0.83-3.27a1.69 1.69 0 0 0-1.22-2 1.71 1.71 0 0 0-2.06 1.17z"></path>
			<path d="m2492 461.73a1.69 1.69 0 0 0-2 1.29l-0.82 3.27a1.69 1.69 0 0 0 0.42 1.59 1.58 1.58 0 0 0 0.8 0.46 1.69 1.69 0 0 0 2-1.22l0.61-2.4a1.59 1.59 0 0 0 0.75 0l3.33-0.56a1.69 1.69 0 0 0-0.57-3.33l-3.33 0.57a1.71 1.71 0 0 0-0.89 0.49 1.59 1.59 0 0 0-0.29-0.15z"></path>
			<path d="m2488.7 474.84a1.7 1.7 0 0 0-2 1.23l-0.82 3.27a1.46 1.46 0 0 0 0 0.2 1.69 1.69 0 1 0 3.32 0.63l0.83-3.28a1.69 1.69 0 0 0-1.23-2.05z"></path>
			<path d="m2483.3 489.11-0.82 3.28a1.69 1.69 0 0 0 0.42 1.59 1.58 1.58 0 0 0 0.8 0.46 1.69 1.69 0 0 0 2.05-1.22l0.83-3.28a1.69 1.69 0 0 0-1.22-2 1.71 1.71 0 0 0-2.06 1.17z"></path>
			<path d="m0 1324.9 16.7 48.62 46-10.18 20.52-18.88-16.28-47.43a1 1 0 0 0-0.21-0.93l-0.15-0.11-0.06-0.17h-0.14a1 1 0 0 0-1.07 0.18l-0.07 0.07-44.69 9.86zm2.24 1.39 0.3-0.07a1 1 0 0 0 0.57-0.38 1 1 0 0 0-0.22-1.4l18.44-17 42.2-9.34a1 1 0 0 0 0.25 0.66 1 1 0 0 0 0.52 0.29 1 1 0 0 0 0.9-0.24l0.49-0.45 15.65 45.55-18.61 17.12-0.28-0.83a1 1 0 0 0-1.89 0.65l0.38 1.14-43.15 9.55z"></path>
			<path d="m39.11 1315.6a1 1 0 0 0 0 1.95 0.86 0.86 0 0 0 0.45 0l1.95-0.45a1.025 1.025 0 1 0-0.45-2l-2 0.45z"></path>
			<path d="m53.42 1309.6 1.48-1.36a1 1 0 0 0 0.06-1.41 1 1 0 0 0-1.42-0.06l-1.47 1.36a1.07 1.07 0 0 0-0.3 0.51 1 1 0 0 0 0.75 1.2 1 1 0 0 0 0.9-0.24z"></path>
			<path d="m31.32 1317.4a1 1 0 0 0 0 2 1.14 1.14 0 0 0 0.45 0l1.95-0.46h0.18a1.0009 1.0009 0 0 0-0.63-1.9l-2 0.45z"></path>
			<path d="m59.31 1304.2 1.47-1.35a1 1 0 1 0-1.36-1.41l-1.42 1.34a1 1 0 0 0-0.06 1.41 0.92 0.92 0 0 0 0.51 0.3 1 1 0 0 0 0.86-0.29z"></path>
			<path d="m15.68 1321.1a1 1 0 0 0 0 1.94 0.86 0.86 0 0 0 0.45 0l2-0.45a1.025 1.025 0 0 0-0.45-2l-1.95 0.46z"></path>
			<path d="m7.84 1322.9a1 1 0 0 0 0 2 1.14 1.14 0 0 0 0.45 0l2-0.45a1.0261 1.0261 0 1 0-0.46-2l-1.94 0.45z"></path>
			<path d="m23.43 1319.3a1.0003 1.0003 0 0 0 0.05 2 1.09 1.09 0 0 0 0.44 0l2-0.45a1.025 1.025 0 0 0-0.45-2l-1.95 0.45z"></path>
			<path d="m55.42 1345.6 0.64 1.9a1.07 1.07 0 0 0 1.27 0.65 1 1 0 0 0 0.63-1.27l-0.65-1.89a1 1 0 0 0-1.89 0.61z"></path>
			<path d="m58 1353.2 0.64 1.9a1 1 0 0 0 1.27 0.62 1 1 0 0 0 0.63-1.27l-0.65-1.89a1 1 0 0 0-1.89 0.64z"></path>
			<path d="m52.82 1338.1 0.64 1.89a1 1 0 0 0 0.73 0.66 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.65-1.9a1 1 0 0 0-1.89 0.65z"></path>
			<path d="m45.08 1315.4 0.65 1.89a1 1 0 0 0 0.72 0.66 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.47-1.39a1 1 0 0 0 0.39-0.21l1.46-1.36 0.09-0.08a1.0007 1.0007 0 1 0-1.44-1.39l-1.48 1.36a1 1 0 0 0-0.28 0.53h-0.19a1 1 0 0 0-0.62 1.26z"></path>
			<path d="m48.29 1321.7a1 1 0 0 0-0.63 1.27l0.65 1.9a1 1 0 0 0 0.72 0.65 1 1 0 0 0 0.55 0 1 1 0 0 0 0.62-1.27l-0.65-1.89a1 1 0 0 0-1.26-0.63z"></path>
			<path d="m50.24 1330.5 0.64 1.89a1 1 0 0 0 0.73 0.65 0.83 0.83 0 0 0 0.54 0 1 1 0 0 0 0.63-1.26l-0.65-1.9a1 1 0 0 0-1.89 0.62z"></path>
			<path d="m641.73 1010.1-11.67 25.23 21.76 13.22 15.07 0.3 11.37-24.6a0.51 0.51 0 0 0 0.27-0.44v-0.18h-0.07a0.53 0.53 0 0 0-0.48-0.32h-0.05l-21.15-12.86zm0.28 1.43 0.14 0.09a0.55 0.55 0 0 0 0.74-0.19 0.5 0.5 0 0 0 0.06-0.38l13.55 0.27 20 12.14a0.61 0.61 0 0 0-0.15 0.36 0.54 0.54 0 0 0 0.53 0.55h0.36l-10.93 23.63-13.67-0.27 0.2-0.43a0.54 0.54 0 0 0-0.26-0.72 0.55 0.55 0 0 0-0.72 0.27l-0.27 0.59-20.42-12.44z"></path>
			<path d="m660.39 1021.2a0.55 0.55 0 0 0-0.58 0 0.55 0.55 0 0 0-0.15 0.75 0.58 0.58 0 0 0 0.18 0.17l0.93 0.55a0.52 0.52 0 0 0 0.72-0.2 0.54 0.54 0 0 0-0.19-0.74l-0.93-0.55z"></path>
			<path d="m668.25 1024.2h1.08a0.54 0.54 0 0 0 0.47-0.47 0.55 0.55 0 0 0-0.47-0.62h-1.08a0.54 0.54 0 0 0-0.55 0.53 0.56 0.56 0 0 0 0.09 0.31 0.53 0.53 0 0 0 0.46 0.25z"></path>
			<path d="m656 1019.2a0.53 0.53 0 0 0 0 0.57 0.46 0.46 0 0 0 0.17 0.17l0.93 0.55a0.54023 0.54023 0 0 0 0.55-0.93l-0.93-0.55a0.54 0.54 0 0 0-0.72 0.19z"></path>
			<path d="m672.56 1024.3h1.08a0.54 0.54 0 0 0 0.55-0.53 0.54 0.54 0 0 0-0.53-0.55h-1.1a0.53 0.53 0 0 0-0.53 0.53 0.55 0.55 0 0 0 0.08 0.31 0.54 0.54 0 0 0 0.45 0.24z"></path>
			<path d="m648.51 1014.7a0.55 0.55 0 0 0 0 0.58 0.58 0.58 0 0 0 0.18 0.17l0.93 0.55a0.54023 0.54023 0 0 0 0.55-0.93l-0.93-0.55a0.53 0.53 0 0 0-0.73 0.18z"></path>
			<path d="m645 1012.4a0.54 0.54 0 0 0-0.19 0.75 0.55 0.55 0 0 0 0.18 0.16l0.93 0.56a0.54023 0.54023 0 0 0 0.55-0.93l-0.93-0.56a0.55 0.55 0 0 0-0.54 0.02z"></path>
			<path d="m652.38 1016.8a0.55 0.55 0 0 0-0.15 0.75 0.46 0.46 0 0 0 0.17 0.17l0.93 0.55a0.54279 0.54279 0 0 0 0.56-0.93l-0.93-0.55a0.55 0.55 0 0 0-0.58 0.01z"></path>
			<path d="m655.55 1039-0.45 1a0.55 0.55 0 0 0 0 0.53 0.45 0.45 0 0 0 0.22 0.19 0.54 0.54 0 0 0 0.72-0.26l0.45-1a0.54 0.54 0 0 0-0.26-0.72 0.55 0.55 0 0 0-0.68 0.26z"></path>
			<path d="m653.73 1042.9-0.46 1a0.53 0.53 0 0 0 0 0.52 0.45 0.45 0 0 0 0.22 0.19 0.54 0.54 0 0 0 0.72-0.26l0.46-1a0.55 0.55 0 0 0-0.26-0.72 0.56 0.56 0 0 0-0.68 0.27z"></path>
			<path d="m657.36 1035.1-0.46 1a0.55 0.55 0 0 0 0 0.53 0.45 0.45 0 0 0 0.22 0.19 0.53 0.53 0 0 0 0.7-0.27l0.46-1a0.52326 0.52326 0 1 0-0.94-0.46z"></path>
			<path d="m662.86 1023.3-0.46 1a0.53 0.53 0 0 0 0 0.52 0.45 0.45 0 0 0 0.22 0.19 0.54 0.54 0 0 0 0.72-0.26l0.33-0.72a0.73 0.73 0 0 0 0.24 0.07h1.09a0.54 0.54 0 0 0 0.55-0.53 0.53 0.53 0 0 0-0.53-0.53h-1.08a0.5 0.5 0 0 0-0.31 0.1l-0.09-0.07a0.54 0.54 0 0 0-0.68 0.23z"></path>
			<path d="m661 1027.2-0.46 1a0.53 0.53 0 0 0 0 0.52 0.63 0.63 0 0 0 0.23 0.2 0.54 0.54 0 0 0 0.7-0.28l0.46-1a0.53 0.53 0 0 0-0.26-0.7 0.54 0.54 0 0 0-0.67 0.26z"></path>
			<path d="m659.2 1031.2-0.45 1a0.55 0.55 0 0 0 0 0.53 0.57 0.57 0 0 0 0.22 0.19 0.55 0.55 0 0 0 0.72-0.26l0.45-1a0.52326 0.52326 0 1 0-0.94-0.46z"></path>
			<path d="m804 399-55 44.4 34.74 54.72 34.08 17.68 53.71-43.34a1.37 1.37 0 0 0 1.11-0.71 1.05 1.05 0 0 0 0.06-0.24l0.19-0.15-0.11-0.18a1.37 1.37 0 0 0-0.73-1.29l-0.13-0.07-33.8-53.19zm-0.76 3.54 0.23 0.36a1.37 1.37 0 0 0 2.47-0.39l30.62 15.89 31.92 50.23a1.43 1.43 0 0 0-0.73 0.64 1.4 1.4 0 0 0-0.15 0.8 1.42 1.42 0 0 0 0.74 1.06l0.82 0.42-51.61 41.65-30.9-16 0.93-0.75a1.38 1.38 0 0 0-1.72-2.15l-1.29 1-32.57-51.41z"></path>
			<path d="m833 444.63a1.37 1.37 0 0 0-1.22 1.52 1.2 1.2 0 0 0 0.21 0.58l1.5 2.31a1.38 1.38 0 0 0 2.31-1.5l-1.5-2.31a1.37 1.37 0 0 0-1.3-0.6z"></path>
			<path d="m848.77 460.92 2.45 1.27a1.3731 1.3731 0 0 0 1.26-2.44l-2.48-1.27a1.38 1.38 0 0 0-1.86 0.59 1.48 1.48 0 0 0-0.14 0.8 1.39 1.39 0 0 0 0.77 1.05z"></path>
			<path d="m827 435.39a1.37 1.37 0 0 0-1.22 1.52 1.5 1.5 0 0 0 0.21 0.58l1.5 2.31a1.38 1.38 0 0 0 1.91 0.4 1.36 1.36 0 0 0 0.38-1.89l-1.48-2.31a1.37 1.37 0 0 0-1.3-0.61z"></path>
			<path d="m858.6 466 2.44 1.27 0.2 0.11a1.3827 1.3827 0 0 0 1.07-2.55l-2.44-1.27a1.38 1.38 0 0 0-1.86 0.59 1.32 1.32 0 0 0-0.14 0.8 1.35 1.35 0 0 0 0.73 1.05z"></path>
			<path d="m816.35 417.56a1.38 1.38 0 0 0-2.52 0.92 1.2 1.2 0 0 0 0.21 0.58l1.46 2.26a1.38 1.38 0 0 0 2.31-1.5l-1.5-2.31z"></path>
			<path d="m809 407.67a1.37 1.37 0 0 0-1.22 1.52 1.5 1.5 0 0 0 0.21 0.58l1.5 2.31a1.38 1.38 0 0 0 2.31-1.5l-1.5-2.31a1.37 1.37 0 0 0-1.3-0.6z"></path>
			<path d="m821 426.12a1.37 1.37 0 0 0-1.16 1.55 1.2 1.2 0 0 0 0.21 0.58l1.5 2.31a1.38 1.38 0 0 0 2.31-1.5l-1.5-2.31a1.37 1.37 0 0 0-1.36-0.63z"></path>
			<path d="m805 480.63a1.38 1.38 0 0 0-1.93-0.21l-2.07 1.72a1.4 1.4 0 0 0-0.51 1.25 1.37 1.37 0 0 0 2.23 0.9l2.15-1.72a1.38 1.38 0 0 0 0.21-1.94z"></path>
			<path d="m796.42 487.53a1.38 1.38 0 0 0-1.93-0.22l-2.15 1.69-0.15 0.12a1.38 1.38 0 0 0 1.87 2l2.15-1.73a1.37 1.37 0 0 0 0.21-1.93z"></path>
			<path d="m811.66 473.52-2.14 1.73a1.38 1.38 0 0 0-0.51 1.24 1.24 1.24 0 0 0 0.3 0.69 1.35 1.35 0 0 0 1.91 0.19l2.15-1.72a1.38 1.38 0 1 0-1.73-2.15z"></path>
			<path d="m839.36 453.05a1.37 1.37 0 0 0-1.93-0.2l-2.14 1.72a1.38 1.38 0 0 0-0.22 1.94 1.39 1.39 0 0 0 1.94 0.21l1.57-1.27a1.39 1.39 0 0 0 0.46 0.41l2.45 1.27a1.38 1.38 0 0 0 1.27-2.45l-2.45-1.27a1.37 1.37 0 0 0-0.82-0.11 1.34 1.34 0 0 0-0.12-0.24z"></path>
			<path d="m828.84 459.73-2.14 1.73a1.38 1.38 0 0 0-0.51 1.24 1.37 1.37 0 0 0 2.23 0.9l2.15-1.72a1.38 1.38 0 1 0-1.73-2.15z"></path>
			<path d="m820.25 466.63-2.14 1.72a1.4 1.4 0 0 0-0.51 1.25 1.37 1.37 0 0 0 2.23 0.9l2.15-1.73a1.38 1.38 0 1 0-1.73-2.14z"></path>
			<path d="m323.79 1690.8a1 1 0 0 1-0.19-1.17l327-642.2 1.78 0.91-325.56 639.28 1029.6-569.56 1 1.75-1032.4 571.14a0.91 0.91 0 0 1-0.48 0.13 1 1 0 0 1-0.73-0.28z"></path>
			<path d="M2397.1,519.18L1702.2,1016.6"></path>
			<path transform="rotate(-35.59 2049.6 767.8)" d="M1622.3 766.8 L2476.94 766.8 L2476.94 768.8 L1622.3 768.8 Z"></path>
			<path d="M923.33,1566.3L818.32,513.16"></path>
			<path transform="rotate(-5.69 870.8 1039.8)" d="M869.78 510.6 L871.78 510.6 L871.78 1568.9 L869.78 1568.9 Z"></path>
		</g>
		</g>
              </svg>
            `
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;