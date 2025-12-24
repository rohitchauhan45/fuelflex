import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import meesho from "../assets/Footer/meesho.png";
import flipcart from "../assets/Footer/flipcart.png";
import amazon from "../assets/Footer/amazon.png";
import Linkedin from "../assets/Footer/linkdien.png";
import Instagram from "../assets/Footer/instagram.png";
import Youtube from "../assets/Footer/youtube.png";
import Facebook from "../assets/Footer/facebook.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (email.trim() !== "") {
      window.open("/catalog.pdf", "_blank", "noopener,noreferrer");
    } else {
      toast.error("Enter a valid email");
    }
  };

  return (
    <>
      {/* Animated Waves */}
      <div className="relative w-full     -mt-1 overflow-hidden leading-none">
        <div className="wave-container">
          <svg
            className="wave-svg bg-[#776B5D]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,00 L0,0 Z"
              fill="#F3EEEA"
            />
          </svg>
        </div>
      </div>

      {/* Footer Content */}
      <footer className="footer border border-[#776B5D] w-full bg-[#776B5D] py-12 px-4 md:px-8 lg:px-16 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl">FIRST UNIFIED</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Customer Care :</span> +91 9265067663
                </p>
                <p>
                  <span className="font-semibold">Email :</span> info@fuelflex.in
                </p>
              </div>
            </div>

            {/* Menu & Info Sections */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg">Menu</h3>
                <ul className="space-y-3">
                  <li><a href="/shop">Shop</a></li>
                  <li><a href="/ourstory">Our Story</a></li>
                  <li><a href="/news">Blogs</a></li>
                  <li><a href="/contactus">Contact Us</a></li>
                  <li><a href="/carrer">Career</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg">Info</h3>
                <ul className="space-y-3">
                  <li><a href="/return">Refund & Refund Policy</a></li>
                  <li><a href="/terms">Terms of Service</a></li>
                  <li><a href="/shipping">Shipping Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-lg">
                Want to know more?{" "}
                <a href="/catalog.pdf" target="_blank" rel="noopener noreferrer">
                Catalogue
                </a>
              </h3>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
                />
                <button
                  onClick={handleRedirect}
                  className="px-4 py-2 border border-l-0 border-gray-300 hover:bg-gray-100"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="https://www.facebook.com/profile.php?id=61566589923344" aria-label="Facebook">
                  <img src={Facebook} className="h-5 w-5 mix-blend-color-dodge" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/fuelflex.in/" aria-label="Instagram">
                  <img src={Instagram} className="h-5 w-5 mix-blend-color-dodge" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/@fuelflexoilindia" aria-label="YouTube">
                  <img src={Youtube} className="h-5 w-5 mix-blend-hard-light" alt="YouTube" />
                </a>
                <a href="https://www.linkedin.com/in/first-unified-fuelflex-10a1142b1/" aria-label="LinkedIn">
                  <img src={Linkedin} className="h-5 w-5 mix-blend-color-dodge" alt="LinkedIn" />
                </a>
              </div>

              {/* Marketplace Links */}
              <div className="mt-4 flex flex-col items-center md:items-start gap-2">
                <span className="text-sm text-center md:text-left">
                  We also sell our product on
                </span>
                <div className="flex items-center space-x-4">
                  <a href="https://www.meesho.com/FUELFLEX?ms=2">
                    <img src={meesho} alt="Meesho" className="h-6 mix-blend-hard-light" />
                  </a>
                  <a href="">
                    <img src={flipcart} alt="Flipkart" className="h-6 mix-blend-hard-light" />
                  </a>
                  <a href="">
                    <img src={amazon} alt="Amazon" className="h-6 mix-blend-hard-light" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p className="opacity-75 text-center text-xs">
                © 2025, Fuelflex. All rights reserved
              </p>
              <div className="flex flex-wrap justify-start items-center gap-3">
                <a href="/privacy">• Privacy policy</a>
                <a href="/terms">• Terms of service</a>
                <a href="/return">• Refund policy</a>
                <a href="/shipping">• Shipping policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Wave Animation Styles */}
      <style>{`
        .wave-container {
          position: relative;
          width: 100%;
          height: 100px;
          overflow: hidden;
          line-height: 0;
        }

        .wave-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          animation: wave-animation 10s linear infinite;
        }

        @keyframes wave-animation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
