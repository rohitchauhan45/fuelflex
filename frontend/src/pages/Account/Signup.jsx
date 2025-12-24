import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors((prev) => ({
                ...prev,
                email: emailRegex.test(value) ? "" : "Enter a valid email",
            }));
        }

        if (name === "password") {
            setErrors((prev) => ({
                ...prev,
                password: value.length >= 6 ? "" : "Password must be at least 6 characters",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            email: emailRegex.test(formData.email) ? "" : "Enter a valid email",
            password: formData.password.length >= 6 ? "" : "Password must be at least 6 characters",
        };
        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Signup successful!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error("Signup failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF5E6] flex justify-center px-4">
            <div className="w-full max-w-xl mt-30">
                <h1 className="text-4xl font-bold text-brown-700 font-serif text-center">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full text-center cursor-pointer text-white py-3 rounded-lg text-2xl font-semibold bg-[#6B4743] hover:bg-[#5a3c38] transition duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="flex justify-center items-center mt-6 space-x-4">
                    <p className="text-lg text-gray-700">Already have an account?</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-1/2 cursor-pointer text-white py-3 rounded-lg text-2xl font-semibold bg-[#6B4743] hover:bg-[#5a3c38] transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
