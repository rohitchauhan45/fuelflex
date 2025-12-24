import groundoilfront from "../../assets/Home/productgrid/groundoilfront.jpg";
import groundoilback from "../../assets/Home/productgrid/groundoilback.jpg";
import sunfloweroilfront from "../../assets/Home/productgrid/sunfloweroilfront.jpg";
import sunfloweroilback from "../../assets/Home/productgrid/sunfloweroilback.jpg";
import naturalfront from "../../assets/Home/productgrid/naturalfront.png"
import naturalback from "../../assets/Home/productgrid/naturalback.webp"
import choclatefront from "../../assets/Home/productgrid/choclatefront.png"
import choclateback from "../../assets/Home/productgrid/choclateback.png"

const products = [
    {
      name: "Natural Peanut Butter",
      image1: naturalfront,
      image2: naturalback,
      url: "natural",
    },
    {
      name: "Chocolate Peanut Butter",
      image1: choclatefront,
      image2: choclateback,
      url: "chocolate",
    },
    {
      name: "Groundnut Oil",
      image1: groundoilfront,
      image2: groundoilback,
      url: "groundnutoil",
    },
    {
      name: "Sunflower Oil",
      image1: sunfloweroilfront,
      image2: sunfloweroilback,
      url: "sunfloweroil",
    },
    {
      name: "Coconut Oil",
      image1: "/images/coconut-oil.jpg",
      image2: "/images/coconut-oil-hover.jpg",
      url: "coconutoil",
    },
  ];
  import { useNavigate } from "react-router-dom";
  
  function Productgrid() {
    const navigate = useNavigate();
  
    return (
      <div className="w-full bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(`/shop/${product.url}`)}
              className="flex flex-col items-center group cursor-pointer transform transition-all duration-300"
            >
              {/* Circular Container with Hover Effect */}
              <div className="relative w-42 h-42 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-gray-100 mb-4 transition-transform duration-300 group-hover:scale-105">
                {/* Default Image */}
                <img
                  src={product.image1}
                  alt={product.name}
                  className="absolute w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                />
                {/* Hover Image */}
                <img
                  src={product.image2}
                  alt={product.name}
                  className="absolute w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
  
              {/* Product Name with Hover Effect */}
              <p className="text-center font-medium text-gray-800">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Productgrid;