import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bread from "../assets/News/Bread.png";
import Cake from "../assets/News/Cake.png";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      src: Bread,
      name: "Savor the Earth: How Our Organic Peanut Butter Bites Make a Difference",
      description:
        "Crafted with love and care, our peanut butter bites are more than just a treat — they’re a step towards sustainable farming. With every jar, you're supporting ethical sourcing, green practices, and small farmers making a global impact.",
      content: `Peanut butter is not just a delicious spread; it's a symbol of sustainability. Our Organic Peanut Butter Bites are made using organic peanuts sourced directly from local farmers. This ensures fair trade practices while reducing the environmental impact caused by large-scale farming. Through mindful sourcing and minimal processing, we’re offering a snack that’s healthy for you — and the planet.`,
      date: "March 12, 2024",
      author: "Vivek mesuirya",
      readTime: "4 min read",
    },
    {
      id: 2,
      src: Cake,
      name: "Indulgence Reimagined: The Secret Behind Our Guilt-Free Gourmet Cake",
      description:
        "Baked to perfection with zero preservatives and all-natural ingredients, our gourmet cake blends rich flavor with conscious indulgence. It's the perfect choice for those who crave luxury without compromising health or sustainability.",
      content: `This cake is more than just a dessert — it's a celebration of mindful indulgence. Made with responsibly sourced ingredients like organic flour, fair-trade chocolate, and pasture-raised eggs, each slice offers rich flavor without guilt. With zero preservatives and a clean baking process, our gourmet cake proves that luxury can go hand-in-hand with wellness and sustainability.`,
      date: "April 2, 2024",
      author: "Darshil",
      readTime: "3 min read",
    }
    
  ];

  const selectedArticle = articles.find((article) => article.id === parseInt(id));

  if (!selectedArticle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Article Not Found</h2>
          <button 
            onClick={() => navigate('/news')}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className= "bg-[#F3EEEA] min-h-screen flex items-center justify-center py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-8xl w-full bg-[#F3EEEA]   overflow-hidden">
        {/* Left Side - Image */}
        <div className="relative">
          <img src={selectedArticle.src} alt={selectedArticle.name} className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col justify-start mt-20 ">
          <h1 style={{lineHeight:1}} className="text-4xl font-bold text-gray-900 mb-4 leading-snug">{selectedArticle.name}</h1>
          <p className="text-gray-500 text-sm mb-4">
            By <span className="font-semibold">{selectedArticle.author}</span> • {selectedArticle.date} • {selectedArticle.readTime}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">{selectedArticle.description}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedArticle.content}</p>
          <button 
            onClick={() => navigate('/news')}
            className="mt-6 px-6 py-3 bg-[#776B5D] hover:bg-[#B0A695] text-white font-semibold rounded-lg transition shadow-md"
          >
            Back to News
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
