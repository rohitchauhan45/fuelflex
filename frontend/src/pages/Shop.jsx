import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carddetails from "../Data/Carddetails";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function Shop() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Carddetails);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = Carddetails.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleProductClick = (productId, urls) => {
    setIsTransitioning(true);
    setSelectedProductId(productId);
    document.body.style.opacity = "0";

    setTimeout(() => {
      navigate(`/shop/alldetails/${urls}`);
      document.body.style.opacity = "1";
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className={`max-w-[1440px] bg-[#F3EEEA] mx-auto p-6 sm:p-9 h-full ${isTransitioning ? "fade-out" : ""}`}>

      {/* Shop heading with right-aligned search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 relative flex items-center justify-between"
      >
        {/* Centered Heading */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold font-serif">
          Shop
        </h1>

        {/* Right-aligned search bar (only sm and up) */}
        <div className="hidden sm:block ml-auto w-full sm:w-1/3 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Loader */}
      {isLoading && (
        <div className="text-center text-gray-500 text-sm mb-4 animate-pulse">
          Searching products...
        </div>
      )}

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {!isLoading && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md cursor-pointer transition-transform transform ${
                selectedProductId === product.id ? "opacity-50 scale-95" : "hover:scale-105 hover:shadow-lg"
              } border border-transparent overflow-hidden`}
              onClick={() => handleProductClick(product.id, product.urls)}
            >
              <div className="w-full bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                <motion.img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-72 object-contain bg-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex flex-col h-24 items-center bg-[#EBE3D5] hover:bg-[#B0A695] p-4 rounded-b-lg">
                <h2 className="font-serif text-center text-lg font-medium">{product.name}</h2>
                <p className="text-xl font-semibold text-black mt-2">Rs. {product.price}.00</p>
              </div>
            </motion.div>
          ))
        ) : (
          !isLoading && (
            <p className="text-center col-span-full text-gray-600">No products found.</p>
          )
        )}
      </motion.div>
    </div>
  );
}

export default Shop;
