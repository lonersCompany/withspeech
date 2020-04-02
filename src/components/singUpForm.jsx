import React, { useState } from "react";
import { Auth } from "aws-amplify";

import { useHistory } from "react-router-dom";

// const GoogleSingIn = params => {
//   return (
//     <button
//       onClick={() => Auth.federatedSignIn({ provider: "Google" })}
//       className="w-full mb-5 py-5 text-center border border-gray-300"
//     >
//       <span>
//         <GoogleIco />
//       </span>{" "}
//       Sing in with Google
//     </button>
//   );
// };

//const Federated = withGoogle(GoogleSingIn);

const SingUpForm = params => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone_number, setPhone_number] = useState();
  const [signUp, setSignUp] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    console.log(username);
    console.log(email);

    const responseAuth = Auth.signUp({
      username,
      password,
      attributes: { email }
    });

    responseAuth
      .then(msg => {
        console.log(msg);
        history.push("/dashboard");
      })
      .catch(err => {
        setErrMessage(err.message);
        console.log(err);
      });
  };

  // const handleConfirm = () => {
  //   const responseConfirm = Auth.confirmSignUp(username, confirmationCode);
  //   responseConfirm
  //     .then(() => console.log("confirmed sign up"))
  //     .catch(err => console.log(err));
  // };

  return (
    <div>
      <h1>With account you can save your audio articles</h1>
      {/* <Federated
        federated={federated}
        onStateChange={() => console.log("what?")}
      /> */}
      <div className="mb-5 text-center">Use your E-mail to sign in</div>
      <form onSubmit={handleSubmit}>
        <input
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="text"
          name="username"
          placeholder="E-mail"
          onChange={e => {
            console.log(e.target.value);
            setUsername(e.target.value);
            setEmail(e.target.value);
          }}
        />

        <input
          className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
          type="password"
          placeholder="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        {errMessage ? (
          <div className="bg-red-500 mb-5 bg-gray-800 rounded-lg py-5 px-4 block w-full">
            {errMessage}
            <span role="img" description="sad emoji">
              😑
            </span>{" "}
          </div>
        ) : (
          ""
        )}
        <button className="w-full bg-blue-500 py-5 mb-5">Create account</button>
      </form>

      {signUp ? (
        <div className="mb-5 text-center mb-10">
          Check your E-mail, we send you verification :){" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default SingUpForm;
