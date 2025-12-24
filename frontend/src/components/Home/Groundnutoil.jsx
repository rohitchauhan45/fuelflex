import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Ground_Oil from "../../assets/Shop/Ground_Oil.jpg";
import Groundnut_5_Oil from "../../assets/Shop/Groundnut_5_Oil.png";
import Cold_Groundnut_Oil from "../../assets/Shop/Groundnut_Oil.jpg";

const Productgrid = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Groundnut oil with Pack of 1 liter",
      urls: "Groundnut_oil_with_Pack_of_1_liter",
      price: "300",
      image1: Ground_Oil,
      image2: Ground_Oil,
    },
    {
      id: 2,
      name: "Cold pressed groundnut oil with Pack of 5 liter",
      urls: "Groundnut_oil_with_Pack_of_5_liter",
      price: "1000",
      image1: Groundnut_5_Oil,
      image2: Groundnut_5_Oil,
    },
    {
      id: 3,
      name: "Cold pressed groundnut oil with pack of 15 kg",
      urls: "Cold_pressed_groundnut_oil_with_pack_of_15_kg",
      price: "3,200",
      image1: Cold_Groundnut_Oil,
      image2: Cold_Groundnut_Oil,
    },
  ];

  const handleClick = (url) => {
    navigate(`/shop/alldetails/${url}`);
  };

  return (
    <div className="w-full bg-[#F3EEEA] py-8 md:py-10">
      <h1 className="text-4xl font-bold font-serif text-center w-full sm:w-1/3 mx-auto mb-10">
        Groundnut Oil
      </h1>

      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col group cursor-pointer bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:shadow-xl hover:scale-[1.02] w-full max-w-md mx-auto"
            onClick={() => handleClick(product.urls)}
          >
            <div className="relative h-74 w-full aspect-[4/3] flex items-center justify-center bg-gray-100 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={product.image1}
                alt={product.name}
                className="mix-blend-darken absolute w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
              />
              <img
                src={product.image2}
                alt={product.name}
                className="mix-blend-darken absolute w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>

            <div className="bg-[#EBE3D5] hover:bg-[#B0A695] transition-colors px-4 py-3 h-22 text-center">
              <h2 className="font-serif text-center text-lg font-medium">{product.name}</h2>
              <p className="text-xl font-semibold text-black mt-2">Rs. {product.price}.00</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Productgrid;
