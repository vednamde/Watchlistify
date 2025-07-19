import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-red-500">Create an Account</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#2c2c2c] text-white rounded focus:outline-none focus:ring focus:ring-red-500"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-[#2c2c2c] text-white rounded focus:outline-none focus:ring focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-[#2c2c2c] text-white rounded focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Create a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
