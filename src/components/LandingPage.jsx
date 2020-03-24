import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMockup from "./MobileMockup";
const LandingPage = () => {
  const embed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/_vqe59dIFDY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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
                👋
              </span>
            </button>
          </Link>
        </div>
        <div className="flex-grow text-right text-xl">
          <Link to="/app">
            <button>Log in</button>
          </Link>
        </div>
      </nav>
      <section className="pb-20">
        <div className="px-10 pt-20">
          <h1 class="text-6xl">{appTitle} </h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="lg:flex">
          <div className="lg:w-2/5 p-10">
            <div>
              <p className="text-3xl font-light">{appDefinition}</p>
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
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/_vqe59dIFDY"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
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
