import React, { useState, useEffect } from "react";
import Mit_bhuva from "../assets/Ourstory/Mit_bhuva.png";
import Layer_1 from "../assets/Ourstory/Layer_1.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="ourstory relative mb-5 bg-[#F3EEEA] rounded-3xl transition-all duration-300 flex flex-col items-center p-6 hover:scale-105 hover:bg-[#B0A695]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#6B4743] flex items-center justify-center text-white text-5xl shadow-md hover:bg-white hover:text-[#6B4743]">
        {icon}
      </div>
      <h3 className="ourstoryform mt-20 text-2xl font-semibold text-gray-800 text-center">
        {title}
      </h3>
      <p className="ourstoryform mt-4 text-gray-600 text-center text-lg">
        {description}
      </p>
    </div>
  );
};

const CardSection = () => {
  const cardData = [
    {
      icon: "💡",
      title: "Vision",
      description:
        "Fuelflex: Proud high quality foods. To empower communities by making healthy, high-quality food accessible to all, fostering a culture of wellness and sustainable living.",
    },
    {
      icon: "🎯",
      title: "Mission",
      description:
        "Fuelflex serves high quality food & our main aim is improving people's health. We are committed to being a partner in that journey by making healthy eating easy, enjoyable, and accessible to everyone.",
    },
    {
      icon: "🌟",
      title: "Ambition",
      description:
        "Purpose of Quality Commitment: To uphold the highest standards of food quality ensuring that every meal we serve contributes to our customers' health.",
    },
  ];

  return (
    <div className="py-20 bg-[#F3EEEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cardData.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLayout = () => {
  return (
    <div className="flex justify-center items-center bg-[#F3EEEA]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 bg-[#F3EEEA] rounded-lg overflow-hidden mt-10 transition-transform duration-500">
        <div className="lg:order-first lg:col-span-3 p-8 hover:text-white">
          <h2
            style={{ lineHeight: "1" }}
            className="mydescription bg-[#F3EEEA] text-2xl font-bold mb-4 text-gray-800"
          >
            Chase your vision, not the competition
          </h2>
          <p className="mydescription text-gray-700 leading-relaxed">
            FIRST UNIFIED was incepted by Mit Bhuva. Bringing their
            entrepreneurial skills, commitment, and astuteness to the fore, they
            have been guiding their team, working day in and day out to realise
            a dream. To their repertoire of skills, they have added the human
            element which has proved critical in making a success of FIRST
            UNIFIED.
          </p>
        </div>
        <div className="lg:col-span-2">
          <img
            src={Mit_bhuva}
            alt="Founder Mit Bhuva - First Unified healthy food brand"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const Ourstory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Just a blank pause
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Story | Fuellex</title>
        <meta
          name="description"
          content="Discover the journey of Fuellex and founder Mit Bhuva. Learn about our vision, mission, and commitment to high-quality, healthy food."
        />
      </Helmet>

      {isLoading ? (
        <div className="h-screen w-full bg-white" />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-[#F3EEEA] py-0"
          >
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-0">
              <h1 className="text-4xl font-bold text-center text-gray-800 py-8">
                Our Story
              </h1>
              <img
                src={Layer_1}
                alt="Fuellex story banner - a legacy of food and wellness"
                className="mb-1 shadow-md w-full"
              />
            </div>
          </motion.div>
          <GridLayout />
          <CardSection />
        </>
      )}
    </>
  );
};

export default Ourstory;
