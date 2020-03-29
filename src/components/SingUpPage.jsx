import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <SingUpForm />
      </div>
    </div>
  );
};

export default SingUpPage;
