import { useState, useEffect } from "react";
import CarouselImage1 from "../../assets/Home/Carousel/Carousel_image_1.jpg";
import CarouselImage2 from "../../assets/Home/Carousel/Carousel_image_2.jpg";

const Carousel = () => {
  const images = [CarouselImage1, CarouselImage2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative  w-full h-[170px]  sm:h-[400px]  lg:h-[490px] overflow-hidden">
    {/* Carousel Slides */}
    <div className="relative h-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  </div>

  );
};

export default Carousel;
