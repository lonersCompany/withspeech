import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMockup from "./MobileMockup";
const LandingPage = () => {
  const appTitle = "Listen audio with text and images. ";
  const appDefinition =
    "Create text with audio AI natural voice. Edit content in text and audio layer will automatically synchronize.";
  return (
    <div className="text-white w-full max-w-screen-xl mx-auto ">
      <nav className="flex  p-5 px-10">
        <div>
          <Link to="/">
            <button className="text-left font-semibold text-xl">
              Wave Page{" "}
              <span role="img" description="wave hand">
                👋🏼
              </span>
            </button>
          </Link>
        </div>
        <div className="flex-grow text-right text-xl">
          <Link to="/login" className="px-5 py-3">
            Log in
          </Link>
          <Link to="/signup" className="bg-blue-900 px-5 py-3">
            Get started<span className="">&nbsp;— it's free</span>
          </Link>
        </div>
      </nav>
      <section className="py-20 px-10">
        <h1 className="text-6xl mb-0">{appTitle} </h1>
      </section>

      <section className="pb-20">
        <div className="lg:flex">
          <div className="lg:w-2/5 p-10 text-3xl ">
            <p className="font-light">{appDefinition}</p>
            <div>
              <Link to="/signup">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4">
                  Try beta version{" "}
                  <span role="img" description="wave hand">
                    🖖🏼
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:w-3/5 p-10">
            <iframe
              width="100%"
              height="340"
              src="https://www.youtube.com/embed/_vqe59dIFDY"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <MobileMockup />
      </section>
    </div>
  );
};

export default LandingPage;
