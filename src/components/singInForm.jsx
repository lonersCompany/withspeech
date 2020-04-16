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

const SingInForm = ({ setAuth, setAuthProcess }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  //let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Auth.signIn(username, password);
      setAuthProcess(false);
      setAuth(response.username);
    } catch (error) {
      console.log(`Error logging in: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
        type="email"
        placeholder="E-mail"
      ></input>

      <input
        type="text"
        name="username"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
        type="password"
        placeholder="Password"
      ></input>
      <button className="w-full bg-green-500 py-5">Log In</button>
    </form>
  );
};

export default SingInForm;
