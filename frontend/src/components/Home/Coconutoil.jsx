import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Coconut_Oil from "../../assets/Shop/Coconut_Oil.jpg";

const Productgrid = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Coconut oil with pack of 1 liter",
      urls: "Coconut_oil_with_pack_of_1_liter",
      price: "500",
      image1: Coconut_Oil,
      image2: Coconut_Oil,
    },
  ];

  const handleClick = (url) => {
    navigate(`/shop/alldetails/${url}`);
  };

  return (
    <div className="w-full bg-[#F3EEEA] py-8 md:py-10">
      {/* Heading Section */}
      <motion.h1
        className="text-4xl font-bold font-serif text-center w-full sm:w-1/3 mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Coconut Oil
      </motion.h1>

      {/* Product Grid Section */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="flex flex-col group cursor-pointer bg-white shadow-md rounded-xl overflow-hidden transition-transform w-full max-w-md mx-auto"
            onClick={() => handleClick(product.urls)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Image Section */}
            <div className="relative h-74 w-full aspect-[4/3] flex items-center justify-center bg-gray-100 overflow-hidden">
              <motion.img
                src={product.image1}
                alt={product.name}
                className="mix-blend-darken absolute w-full h-full object-contain"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <motion.img
                src={product.image2}
                alt={product.name}
                className="mix-blend-darken absolute w-full h-full object-contain"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Info Section */}
            <motion.div
              className="bg-[#EBE3D5] hover:bg-[#B0A695] transition-colors px-4 py-3 h-22 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              <h2 className="font-serif text-center text-lg font-medium">
                {product.name}
              </h2>
              <p className="text-xl font-semibold text-black mt-2">
                Rs. {product.price}.00
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Productgrid;
