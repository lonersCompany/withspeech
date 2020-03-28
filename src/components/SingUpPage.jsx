import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIco from "./googleIco";

import SingUpForm from "./singUpForm";

const SingUpPage = params => {
  return (
    <div>
      <nav className="flex p-5 px-10">
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
        <div className="flex-grow text-right text-xl"></div>
      </nav>
      <div className="lg:w-1/3 m-auto">
        <h1>With account you can save your audio articles</h1>
        <button className="w-full mb-5 py-5 text-center border border-gray-300">
          <span>
            <GoogleIco />
          </span>{" "}
          Sing in with Google
        </button>
        <div className="mb-5 text-center">Or use your E-mail</div>
        <SingUpForm />
      </div>
    </div>
  );
};

export default SingUpPage;
