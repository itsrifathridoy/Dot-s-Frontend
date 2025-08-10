'use client';

import React from "react";

const Register= () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 text-black">Create Account</h2>
                <p className="mb-4 sm:mb-6 text-sm text-black">
                    or{" "}
                    <a href="/SignIn" className="text-blue-600 hover:underline">
                        sign in to your account
                    </a>
                </p>

                <form className="space-y-3 sm:space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email*
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                            Phone Number*
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Password*
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                            required
                        />
                        <p className="text-xs text-black mt-1">Minimum 8 characters with at least one number</p>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
                            Re-enter Password*
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Profile Picture Field */}
                    <div>
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-black mb-1">
                            Profile Picture
                        </label>
                        <div className="flex items-center">
                            <input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                className="block w-full text-xs sm:text-sm text-black
                                file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4
                                file:rounded file:border-0
                                file:text-xs sm:file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition text-sm sm:text-base"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-4 sm:mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-black">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <button className="w-full flex items-center justify-center border border-gray-300 py-2 sm:py-3 rounded hover:bg-gray-100 transition">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#EA4335"/>
                                <path d="M5.307 12c0-1.546.533-2.96 1.413-4.067l3.027-2.28C8.067 6.853 6.693 9.173 6.693 12s1.373 5.147 3.053 6.347l-3.027-2.28C5.84 14.96 5.307 13.546 5.307 12z" fill="#FBBC05"/>
                                <path d="M12.48 24c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48v4.133h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12z" fill="#4285F4"/>
                                <path d="M12.48 5.653c1.173 0 2.267.4 3.107 1.173l2.307-2.307C16.987 2.693 14.987 0 12.48 0 9.867 0 7.253 1.44 5.307 3.933l3.027 2.28C9.693 5.653 11.307 5.653 12.48 5.653z" fill="#34A853"/>
                            </svg>
                            <span className="text-black text-sm sm:text-base">Google</span>
                        </button>

                        <button className="w-full flex items-center justify-center border border-gray-300 py-2 sm:py-3 rounded hover:bg-gray-100 transition">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                            </svg>
                            <span className="text-black text-sm sm:text-base">Facebook</span>
                        </button>
                    </div>
                </div>

                <p className="mt-3 sm:mt-4 text-xs text-center text-black">
                    By creating an account, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Register;