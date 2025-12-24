import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  // Format the number based on the provided stats
  const formatNumber = () => {
    return `${count}+`;
  };

  return <div ref={ref}>{formatNumber()}</div>;
};

const StatsSection = () => {
  // The color you specified: 776B5D (a warm taupe/brown)
  const iconColor = "#776B5D";
  
  return (
    <div className="bg-[#F3EEEA]  py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-32 lg:space-x-90 space-y-20 md:space-y-0">
          {/* Outlets */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={iconColor} strokeWidth="1.5" />
                <path d="M9 22V12h6v10" stroke={iconColor} strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-4xl text-gray-800 font-bold">
              <CountUp end={7000} duration={2500} />
            </div>
            <div className="contactusdescription text-xl mt-2">Outlets</div>
          </div>
          
          {/* Cities */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={iconColor} strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-4xl text-gray-800 font-bold">
              <CountUp end={70} duration={2000} />
            </div>
            <div className="contactusdescription text-xl mt-2">Cities</div>
          </div>
          
          {/* Countries */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" stroke={iconColor} strokeWidth="1.5" />
                <circle cx="12" cy="10" r="3" stroke={iconColor} strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-4xl text-gray-800 font-bold">
              <CountUp end={6} duration={1500} />
            </div>
            <div className="tcontactusdescription text-xl mt-2">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;