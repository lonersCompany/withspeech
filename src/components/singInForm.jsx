import React, { useState } from "react";
import { Auth } from "aws-amplify";

import GoogleIco from "./googleIco";

const SingInForm = params => {
  const [username, setUsername] = useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [signIn, setSignIn] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const responseAuth = Auth.signIn({
      username,
      password
    });

    responseAuth
      .then(msg => {
        console.log(msg);
      })
      .catch(err => console.log(err));

    Auth.confirmSign(username)
      .then(() => console.log("confirmed sign in"))
      .catch(err => console.log(err));
    console.log("obhandleSubmitject");
    setSignIn(true);
  };

  return (
    <div className="lg:w-1/3 m-auto">
      <h1>Log Into My Account</h1>
      <button className="w-full mb-5 py-5 text-center border border-gray-300">
        <span>
          <GoogleIco />
        </span>{" "}
        Sing in with Google
      </button>
      <div className="mb-5 text-center">Or</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.value)}
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="email"
          placeholder="E-mail"
        ></input>

        <input
          type="text"
          name="username"
          onChange={e => setPassword(e.value)}
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="email"
          placeholder="Password"
        ></input>
        <button className="w-full bg-blue-500 py-5">Log In</button>
      </form>
    </div>
  );
};

export default SingInForm;
