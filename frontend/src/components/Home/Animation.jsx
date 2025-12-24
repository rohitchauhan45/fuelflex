import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import i1 from "../../assets/Home/Animation/Natural_Peanut_350gm.png";
import i2 from "../../assets/Home/Animation/Choclate_Peanut_350gm.png";
import i3 from "../../assets/Home/Animation/Groundnut_Oil.png";
import i4 from "../../assets/Home/Animation/Sunflower_Oil.png";
import i5 from "../../assets/Home/Animation/Coconut_Oil.png";

const products = [
  {
    image: i1,
    heading: `Natural Peanut Butter`,
    description: `Natural
Healthy
Authentic  


Natural Peanut butter with no added sugar, no solt or any palm oil.`,
    url: "natural",
  },
  {
    image: i2,
    heading: `High Protein Chocolate Peanut Butter`,
    description: `Protein 
Power
Performance  


High Protein Chocolate peanut butter with 36 gm protein, low sugar consumption. Our product's USP is we provide highest protein 36gm naturally.`,
    url: "chocolate",
  },
  {
    image: i3,
    heading: `Groundnut Oil`,
    description: `Where Every Drop Tells a Legacy  


Started with small-batch presses and big dreams today, our pure groundnut oil reaches over 7000 outlets, staying true to our roots with every drop.`,
    url: "groundnutoil",
  },
  {
    image: i4,
    heading: `Sunflower Oil`,
    description: `From Pure Origins to Pinnacles of Purity  


From rustic roots to the pinnacle of purity, we’ve redefined tradition into the quintessential sunflower oil experience golden, wholesome, and steeped in nature’s brilliance.`,
    url: "sunfloweroil",
  },
  {
    image: i5,
    heading: `Coconut oil`,
    description: `Nurtured by Nature  


It all started in a coastal village, where coconuts were more than just fruit they were tradition, pressed with love and care.`,
    url: "coconutoil",
  },
];

export default function ProductHeroBanner() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${products[current].url}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const description = products[current].description;
  const [points, detail] = description.split("\n\n");
  const bulletPoints = points.split("\n").filter((line) => line.trim() !== "");

  const transition = {
    duration: 0.8,
    ease: [0.42, 0, 0.58, 1],
  };

  return (
    <div className="w-full h-screen bg-[#F3EEEA] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute w-full h-full overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
      >
        <motion.div
          className="absolute rounded-full opacity-60 blur-3xl"
          style={{ width: "300px", height: "300px", top: "10%", left: "5%" }}
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bg-orange-200 rounded-full opacity-50 blur-2xl"
          style={{ width: "200px", height: "200px", bottom: "15%", right: "10%" }}
          animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bg-yellow-400 rounded-full opacity-40 blur-2xl"
          style={{ width: "150px", height: "150px", top: "50%", left: "40%" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Product Carousel */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-7xl h-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex flex-col md:flex-row items-center justify-center w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            {/* Bullet Points */}
            <motion.div
              className="w-full md:w-72 flex flex-col items-start justify-start gap-2 p-6 text-left md:absolute md:top-20 md:left-20 mb-8 md:mb-0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={transition}
            >
              {bulletPoints.map((line, idx) => (
                <p
                  key={idx}
                  className="alldetailsdescription text-sm md:text-base font-medium text-[#3a3a3a] flex items-start gap-2"
                >
                  {line}
                </p>
              ))}
            </motion.div>

            {/* Center Image (Clickable) */}
            <motion.div
              className="z-10 my-6 md:my-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={transition}
            >
              <img
                onClick={handleClick}
                src={products[current].image}
                alt="Product"
                className="h-[340px] sm:h-[300px] md:h-[550px] object-contain drop-shadow-2xl cursor-pointer"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              className="w-full md:w-96 flex flex-col gap-2 p-4 bg-opacity-60 rounded-xl md:absolute md:bottom-40 md:right-5 mt-8 md:mt-0"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={transition}
            >
              <div className="alldetailsdescription text-sm md:text-base text-gray-800 font-medium text-left pl-1">
                {detail}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
