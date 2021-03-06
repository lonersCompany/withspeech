import React, { useState } from "react";
import { Link } from "react-router-dom";

import SingUpForm from "./SingUpForm";
import SingInForm from "./SingInForm";

const LogInPage = ({ children }) => {
  return (
    <>
      <h1>Log Into My Account</h1>

      <div className="">{children}</div>
    </>
  );
};

const SingUpPage = ({ children }) => {
  return (
    <>
      <h1>With account you can create and save wavepage documents for free</h1>

      <div className="">{children}</div>
    </>
  );
};

const AuthLayer = ({ setAuth, setAuthProcess }) => {
  const [logInMode, setLogMode] = useState(false);
  return (
    <div className="fixed flex justify-center items-center top-0 w-full h-full z-30">
      <div className="p-10 w-3/4 bg-black shadow">
        <div className="text-center lg:px-10">
          <nav className="flex p-5">
            <div>
              <Link to="/">
                <button className="text-left font-semibold text-xl">
                  Wave Page{" "}
                  <span role="img" aria-label="" description="wave hand">
                    🌀
                  </span>
                </button>
              </Link>
            </div>
            <div className="flex-grow text-right text-xl">
              <button onClick={() => setAuthProcess(false)}>X</button>
            </div>
          </nav>

          <div className="mb-10">
            {logInMode ? (
              <LogInPage>
                <SingInForm setAuth={setAuth} setAuthProcess={setAuthProcess} />
              </LogInPage>
            ) : (
              <SingUpPage>
                <SingUpForm setLogMode={setLogMode} />
              </SingUpPage>
            )}
          </div>

          <button
            className="text-blue-500 border border-blue-500 px-2 rounded"
            onClick={() => {
              logInMode ? setLogMode(false) : setLogMode(true);
            }}
          >
            {logInMode ? "Create new account" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayer;
