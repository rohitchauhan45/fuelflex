import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Natural_Peanut_350gm from "../../assets/Shop/Natural_Peanut_350gm.png";
import Natural_Peanut_850gm from "../../assets/Shop/Natural_Peanut_850gm.jpg";

import Natural_Peanut_1250gm from "../../assets/Shop/Natural_Peanut_1250gm.jpg";

const Productgrid = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Natural peanut butter with pack of 350gm",
      urls: "Natural_peanut_butter_with_pack_of_350gm",
      price: "250",
      image1: Natural_Peanut_350gm,
      image2: Natural_Peanut_350gm,
    },
    {
      id: 2,
      name: "Natural peanut butter with pack of 850gm",
      urls: "Natural_peanut_butter_with_pack_of_850gm",
      price: "500",
      image1: Natural_Peanut_850gm,
      image2: Natural_Peanut_850gm,
    },
    {
      id: 3,
      name: "Choclate peanut butter with pack of 1250gm",
      urls: "Natural_peanut_butter_with_pack_of_1250gm",
      price: "700",
      image1: Natural_Peanut_1250gm,
      image2: Natural_Peanut_1250gm,
    },
  ];

  const handleClick = (url) => {
    navigate(`/shop/alldetails/${url}`);
  };

  return (
    <motion.div
      className="w-full bg-[#F3EEEA] py-8 md:py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Heading Section */}
      <motion.h1
        className="text-4xl font-bold font-serif text-center w-full sm:w-1/3 mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Natural Peanut Butter
      </motion.h1>

      {/* Product Grid Section */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="flex flex-col group cursor-pointer bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:shadow-xl hover:scale-[1.02] w-full max-w-md mx-auto"
            onClick={() => handleClick(product.urls)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Image Section */}
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

            {/* Info Section */}
            <div className="bg-[#EBE3D5] hover:bg-[#B0A695] transition-colors px-4 py-3 h-22 text-center">
              <h2 className="font-serif text-center text-lg font-medium">{product.name}</h2>
              <p className="text-xl font-semibold text-black mt-2">Rs. {product.price}.00</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Productgrid;
