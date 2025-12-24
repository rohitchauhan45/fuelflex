import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function Contactus() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    mobileno: "",
    message: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [submitting, setSubmitting] = useState(false); // 👈 Added state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isMobileValid) {
      toast.error("Please enter valid email and mobile number.");
      return;
    }

    setSubmitting(true); // 👈 Set to true before sending

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/contact`, formdata);

      toast.success("Your message has been sent successfully!");
      setformdata({
        name: "",
        email: "",
        mobileno: "",
        message: "",
      });
      setIsEmailValid(true);
      setIsMobileValid(true);
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false); // 👈 Reset state after submit
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value) || value === "");
    }

    if (name === "mobileno") {
      const mobileRegex = /^[0-9]{0,10}$/;
      if (mobileRegex.test(value)) {
        setformdata((prev) => ({ ...prev, [name]: value }));
        setIsMobileValid(value.length === 10 || value === "");
        return;
      } else {
        setIsMobileValid(false);
        return;
      }
    }

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[#F3EEEA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto mb-15">
          <h1 className="ourstoryform font-bold text-gray-800 text-center mb-20">
            Let's get in touch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="contactusdescription text-gray-700 font-bold">FIRST UNIFIED</span>

                <div className="mt-4">
                  <h3 className="contactusdescription text-lg font-semibold text-gray-700">
                    Office Address
                  </h3>
                  <p className="contactusdescription text-gray-600">
                    49, Ved Industrial Park-2, Bhuvaladi Gam Road, Kathwada,
                    Ahmedabad, Gujarat-382430
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2">
                      <svg className="h-5 w-5 text-[#6B4743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m-4 4v6m-3-3h6" />
                      </svg>
                    </span>
                    <a href="tel:+919265067663" className="contactusdescription text-gray-600 hover:text-amber-700 transition-colors">
                      +91 9265067663
                    </a>
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2">
                      <svg className="h-5 w-5 text-[#6B4743]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-7.89 5.26a2 2 0 01-2.22 0L3 8z" />
                      </svg>
                    </span>
                    <a href="mailto:info@fuellex.in" className="contactusdescription text-gray-600 hover:text-amber-700 transition-colors">
                      info@fuellex.in
                    </a>
                  </div>
                </div>

                <p className="contactusdescription text-gray-600 mt-4">
                  An ISO 9001: 2015 Certified Company
                </p>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block ourstoryform font-bold">Name*</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formdata.name}
                    onChange={handlechange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block ourstoryform font-bold">Email*</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formdata.email}
                    onChange={handlechange}
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${isEmailValid ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                  {!isEmailValid && (
                    <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobileno" className="block ourstoryform font-bold">Mobile Number*</label>
                  <motion.input
                    type="tel"
                    id="mobileno"
                    name="mobileno"
                    value={formdata.mobileno}
                    onChange={handlechange}
                    required
                    placeholder="Enter 10-digit mobile number"
                    className={`mt-1 block w-full px-3 py-2 border ${isMobileValid ? "border-gray-300" : "border-red-500"} rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  {!isMobileValid && (
                    <p className="text-red-600 text-sm mt-1">Mobile number must be exactly 10 digits.</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block ourstoryform font-bold">Message*</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formdata.message}
                    onChange={handlechange}
                    rows="4"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <motion.button
                    type="submit"
                    disabled={submitting} // 👈 Disabled when submitting
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                      submitting ? "bg-gray-400 cursor-not-allowed" : " bg-[#6B4743] hover:bg-[#5a3c38] "
                    } text-white transition duration-300`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
