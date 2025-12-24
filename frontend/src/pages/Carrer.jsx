import React, { useState } from "react";
import Cover from "../assets/Carrer/Be_a_part_of_our_journey.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import motion

function Carrer() {
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    resume: null,
    contactnumber: "",
    message: "",
  });

  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(validEmail.test(value) ? "" : "Invalid email format");
    }

    if (name === "contactnumber") {
      const contactRegex = /^\d{0,10}$/;
      if (!contactRegex.test(value)) return;
      setContactError(value.length < 10 ? "Must be 10 digits" : "");
    }

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setformdata((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || contactError) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    const data = new FormData();
    data.append("firstname", formdata.firstname);
    data.append("lastname", formdata.lastname);
    data.append("email", formdata.email);
    data.append("contactnumber", formdata.contactnumber);
    data.append("message", formdata.message);
    data.append("resume", formdata.resume);

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BASE_URL}/career`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Career form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setformdata({
        firstname: "",
        lastname: "",
        email: "",
        resume: null,
        contactnumber: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed to submit the career form.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Cover Image Section */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={Cover} alt="Career Cover" className="w-full" />
      </motion.div>

      {/* Intro Section */}
      <motion.div
        className="bg-[#F3EEEA] py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="ourstory text-gray-700 mb-4">
            Apply now and be a part of our energetic team!
          </p>
          <p className="ourstory text-gray-700 mb-8">
            Joining First Unified means becoming part of a dynamic team...
          </p>
        </motion.div>
      </motion.div>

      {/* Career Form Section */}
      <motion.div
        className="bg-[#F3EEEA] py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="ourstoryform font-bold text-gray-800 text-center mb-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Elevate Your Career Path.
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div>
                <label htmlFor="firstName" className="block ourstoryform font-bold">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handlechange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block ourstoryform font-bold">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handlechange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block ourstoryform font-bold">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block ourstoryform font-bold">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactnumber"
                name="contactnumber"
                value={formdata.contactnumber}
                onChange={handlechange}
                maxLength={10}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {contactError && <p className="text-red-600 text-sm">{contactError}</p>}
            </div>

            {/* Resume File Upload */}
            <div>
              <label htmlFor="resume" className="block ourstoryform font-bold">
                Resume
              </label>
              {!formdata.resume && (
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-30 text-sm text-slate-500 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-none file:text-sm file:font-semibold file:bg-[#6B4743] file:text-white hover:file:bg-[#D6B484]"
                />
              )}
              {formdata.resume && (
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-700">{formdata.resume.name}</span>
                  <button
                    type="button"
                    onClick={() => setformdata({ ...formdata, resume: null })}
                    className="text-red-500 hover:text-red-700 font-bold text-lg"
                    title="Remove file"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block ourstoryform font-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formdata.message}
                onChange={handlechange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#6B4743] hover:bg-[#5a3c38]  focus:outline-none"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <ToastContainer />
    </>
  );
}

export default Carrer;
