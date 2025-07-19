import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-b from-[#000000] via-[#870000] to-[#000000] min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<FadeWrapper><Home /></FadeWrapper>} />
            <Route path="/watchlist" element={<FadeWrapper><Watchlist /></FadeWrapper>} />
            <Route path="/movie/:id" element={<FadeWrapper><MovieDetail /></FadeWrapper>} />
            <Route path="/login" element={<FadeWrapper><Login /></FadeWrapper>} />
            <Route path="/signup" element={<FadeWrapper><Signup /></FadeWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

function FadeWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
