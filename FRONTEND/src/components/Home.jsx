import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <section
        className="flex-1 bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/z/soccer-game-men-kicking-ball-training-team-field-sports-athlete-football-player-air-to-jump-goal-259325919.jpg')",
        }}
      >
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
            Book Your Favourite Turf ⚽
          </h1>
          <p className="text-lg md:text-xl mb-6 font-light">
            Play anytime, anywhere — book with ease!
          </p>

          <div className="space-x-4">
            <Link
              to="/userdashboard/viewturf"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg"
            >
              Book Now
            </Link>

            <Link
              to="/login"
              className="border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-2">
        <p className="">@ 2025 TurfZone | All Rights Reserved</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white transition">Facebook</a>
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;





