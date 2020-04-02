import React, { useState } from "react";
import { Auth } from "aws-amplify";

//import GoogleIco from "./googleIco";

import { useHistory } from "react-router-dom";

//import { withGoogle } from "aws-amplify-react";

// const GoogleSingIn = props => {
//   return (
//     <button
//       onClick={props.googleSignIn}
//       className="w-full mb-5 py-5 text-center border border-gray-300"
//     >
//       <span>
//         <GoogleIco />
//       </span>{" "}
//       Sing in with Google
//     </button>
//   );
// };

// const Federated = withGoogle(GoogleSingIn);

const SingInForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    const responseAuth = Auth.signIn({
      username,
      password
    });

    responseAuth
      .then(msg => {
        console.log(msg);
        history.push("/dashboard");
      })
      .catch(err => console.log(err));

    // Auth.confirmSignUp(username)
    //   .then(() => console.log("confirmed sign in"))
    //   .catch(err => console.log(err));
    // console.log("obhandleSubmitject");
  };

  return (
    <div className="lg:w-1/3 m-auto">
      <h1>Log Into My Account</h1>
      {/* <Federated
        federated={federated}
        onStateChange={() => console.log("what?")}
      /> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="email"
          placeholder="E-mail"
        ></input>

        <input
          type="text"
          name="username"
          onChange={e => setPassword(e.target.value)}
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="password"
          placeholder="Password"
        ></input>
        <button className="w-full bg-blue-500 py-5">Log In</button>
      </form>
    </div>
  );
};

export default SingInForm;
