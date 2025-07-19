import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const isLoggedIn = false; // 🔁 Replace this with real logic

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setHide(true); // scrolling down
      } else {
        setHide(false); // scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md shadow-sm"
      initial={{ y: 0 }}
      animate={{ y: hide ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-500">
          <img src={logo} alt="logo" className="w-6 h-6" />
          Watchlistify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-300 hover:text-white"
            }
          >
            Watchlist
          </NavLink>

          {/* Auth Section */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <img
                src="/user-avatar.png"
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 bg-[#1c1c1c] text-sm text-white rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                <Link to="/profile" className="block px-4 py-2 hover:bg-red-500">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-red-500">Settings</Link>
                <button className="block w-full text-left px-4 py-2 hover:bg-red-500">Logout</button>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-white">
          <NavLink to="/" className="block hover:text-red-500" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/watchlist" className="block hover:text-red-500" onClick={() => setMenuOpen(false)}>Watchlist</NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Profile</NavLink>
              <NavLink to="/settings" className="block hover:text-red-400" onClick={() => setMenuOpen(false)}>Settings</NavLink>
              <button className="block text-left hover:text-red-400">Logout</button>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
}
