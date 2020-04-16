import React from "react";
import { Link } from "react-router-dom";

import SingInForm from "./SingInForm";

const LoginPage = () => {
  return (
    <div>
      <nav className="flex p-5 px-10">
        <div>
          <Link to="/">
            <button className="text-left font-semibold text-xl">
              Wave Page{" "}
              <span role="img" aria-label="" description="wave hand">
                👋🏼
              </span>
            </button>
          </Link>
        </div>
        <div className="flex-grow text-right text-xl"></div>
      </nav>
      <div className="lg:w-1/3 m-auto">
        <h1>Log Into My Account</h1>
        <SingInForm />
      </div>
    </div>
  );
};

export default LoginPage;
