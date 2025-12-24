import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Account() {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
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

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            email: emailRegex.test(formdata.email) ? "" : "Enter a valid email",
            password: formdata.password.length >= 6 ? "" : "Password must be at least 6 characters",
        };

        setErrors(newErrors);
        if (newErrors.email || newErrors.password) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                email: formdata.email,
                password: formdata.password,
            },  { withCredentials: true });

            toast.success("Login successful!");
            // Save user, token or navigate to orders/history
            navigate("/shop");
        } catch (error) {
            console.error(error);
            toast.error("Invalid email or password!");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF5E6] flex justify-center px-4">
            <div className="w-full max-w-2xl mt-40">
                <h1 className="text-4xl font-bold text-brown-700 font-serif text-center">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            className="w-full text-lg px-5 py-3 border border-gray-400 rounded-lg shadow-sm"
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a href="#" className="text-dark hover:text-[#B0A695]">Forgot password?</a>
                    </div>

                    {/* Sign In Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full cursor-pointer text-white py-3 rounded-lg text-2xl font-semibold bg-[#6B4743] hover:bg-[#5a3c38] transition duration-200"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Create Account Link */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <p className="text-lg text-gray-700">Don't have an account?</p>
                    <button
                        onClick={() => navigate("/signup")}
                        className="w-1/2 cursor-pointer text-white py-3 rounded-lg text-2xl font-semibold bg-[#6B4743] hover:bg-[#5a3c38] transition duration-200"
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;
