import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search } from "lucide-react";
import Animation from "../components/Home/Animation.jsx";
import StatsSection from "../components/Home/Statssection.jsx";

import africa from "../assets/modal/africa.jpg";
import america from "../assets/modal/america.jpg";
import australia from "../assets/modal/australia.jpg";
import india from "../assets/modal/india.jpg";
import newzealand from "../assets/modal/newzealand.jpg";
import unitedkingdom from "../assets/modal/unitedkingdom.jpg";

const CountryModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const popularCountries = [
    { name: "India", image: india },
    { name: "USA", image: america },
    { name: "Australia", image: australia },
    { name: "UK", image: unitedkingdom },
    { name: "New Zealand", image: newzealand },
    { name: "South Africa", image: africa },
  ];

  const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    , "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Congo-Kinshasa)", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
    "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    , "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", , "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  

  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries([]);
    } else {
      const filtered = allCountries.filter((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country); // Update the selected country
    setSearchQuery(country); // Set the selected country in the search bar
    setFilteredCountries([]); // Close the dropdown list
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/save-country`, {
        country: selectedCountry,
      });
      localStorage.setItem("countryModalShown", "true");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to save country:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#F3EEEA] bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-gray-800">Select Country</h2>
        </div>

        <div className="px-6 relative">
          <input
            type="text"
            placeholder="Search Country"
            className="w-full border border-gray-300 rounded-md py-2 px-4 pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-6 top-0 h-full w-12 flex items-center justify-center bg-[#B0A695] rounded-r-md text-white">
            <Search size={20} />
          </button>

          {searchQuery && (
            <div className="absolute z-10 mt-1 w-full left-0 right-0 px-6">
              <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => handleCountrySelect(country)}
                      className={`flex items-center w-full p-3 hover:bg-gray-100 text-left transition-colors ${
                        selectedCountry === country ? 'bg-[#EBE3D5] font-medium' : ''
                      }`}
                    >
                      <span>{country}</span>
                    </button>
                  ))
                ) : null /* Do not show "No countries found" */
                }
              </div>
            </div>
          )}
        </div>

        <div className="px-6 mt-6 flex-grow">
          <h3 className="text-xl font-semibold text-center mb-6">Popular Countries</h3>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCountries.map((country) => (
              <div
                key={country.name}
                className={`text-center cursor-pointer ${
                  selectedCountry === country.name ? ' ': ''
                }`}
                onClick={() => handleCountrySelect(country.name)}
              >
                <div className={`border ${selectedCountry === country.name ? 'border-black' : 'border-gray-200'} rounded p-2 mb-2`}>
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-24 h-24 object-cover mx-auto rounded"
                  />
                </div>
                <p className="font-medium">{country.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={!selectedCountry}
            className="w-full py-2 bg-[#B0A695] text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, {
          withCredentials: true,
        });
        setShowModal(false); // User is authenticated
      } catch (error) {
        const countryModalShown = localStorage.getItem("countryModalShown");
        if (!countryModalShown) {
          setShowModal(true); // Show modal if not shown before
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      {showModal && <CountryModal onClose={() => setShowModal(false)} />}
      <div className="bg-[#F3EEEA]">
        <Animation />
        <StatsSection />
      </div>
    </>
  );
}

const AnimatedSection = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Home;
