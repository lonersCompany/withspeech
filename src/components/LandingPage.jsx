import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMockup from "./MobileMockup";
const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white w-full max-w-screen-xl mx-auto ">
      <nav className="flex p-5 px-10">
        <div>
          <Link to="/">
            <button className="">
              <span role="img" description="wave hand">
                👋
              </span>{" "}
              Wave Page
            </button>
          </Link>
        </div>
        <div className="flex-grow text-right">
          <button>Log in</button>
        </div>
      </nav>
      <div className="px-10 pt-20">
        <h1 class="text-6xl">Listen audio sync with text and images.</h1>
      </div>

      <div className="flex">
        <div className="w-2/5 p-10">
          <div>
            <p className="text-2xl">Listen audio sync with text and images.</p>
            <div>
              <Link to="/app">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Try for free{" "}
                  <span role="img" description="wave hand">
                    👋
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <MobileMockup />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
