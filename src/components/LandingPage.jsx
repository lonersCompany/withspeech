import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMockup from "./MobileMockup";
const LandingPage = () => {
  const appTitle = "Listen audio with text and images. ";
  const appDefinition =
    "Edit content in text and audio layer will automatically synchronize with best quality AI voices.";
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

      <section className="py-10">
        <div className="lg:flex">
          <div className="lg:w-2/5 p-10 text-2xl">
            <p className="font-light mb-5">{appDefinition}</p>
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
              src="https://www.youtube.com/embed/Qa8Ro4dMgKA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-32">
        <div className="max-w-lg m-auto">
          <div className="border border-gray-700  rounded p-4 flex flex-col justify-between leading-normal">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="https://pbs.twimg.com/profile_images/1245436537938075648/4YpCJ0ZB_400x400.jpg"
                alt="Avatar of Jonathan Reinink"
              />
              <div className="">
                <p className="leading-none">Schitacci</p>
                <p className="text-gray-600">
                  <a href="https://twitter.com/S_SCHITACCI">@S_SCHITACCI</a>
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="">
                I'm learning every day on the internet 🧐 But I'm reading slowly
                and I'm a visual learner so I love to use illustrations and data
                visualizations 📈 That why I develop a tool for converting text
                and images into audio articles 👁️👂👋 If you like to use
                WavePage please let me know ->{" "}
                <a className="text-blue-500" href="mailto:simon@loners.company">
                  simon@loners.company
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-10 bg-blue-600">
        <div className="container">
          <h3 className="text-6xl mb-20">Try simple example:</h3>
        </div>
        <MobileMockup />
      </section>
      <section className="py-48">
        <div className="text-center">
          <p className="leading-none mb-5">
            <a className="text-blue-500" href="mailto:simon@loners.company">
              simon@loners.company
            </a>
          </p>
          <p className="leading-none">
            <a className="text-blue-500" href="https://twitter.com/S_SCHITACCI">
              @S_SCHITACCI
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
