'use client';

import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset logic here
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded shadow-md text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-black">Check your email</h2>
                        <p className="text-gray-600 mb-4">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-gray-500">
                            Didn't receive the email? Check your spam folder or 
                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="text-blue-600 hover:underline ml-1"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                    <a 
                        href="/SignIn" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition inline-block"
                    >
                        Back to Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-2 text-black">Reset your password</h2>
                <p className="mb-6 text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email address*
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-black">
                        Remember your password?{" "}
                        <a href="/SignIn" className="text-blue-600 hover:underline">
                            Back to Sign In
                        </a>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-black">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Create one here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
