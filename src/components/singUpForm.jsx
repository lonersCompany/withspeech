import React, { useState } from "react";
import { Auth } from "aws-amplify";

const SingUpForm = params => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone_number, setPhone_number] = useState();
  const [signUp, setSignUp] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState("");

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
      })
      .catch(err => console.log(err));

    setSignUp(true);
  };

  // const handleConfirm = () => {
  //   const responseConfirm = Auth.confirmSignUp(username, confirmationCode);
  //   responseConfirm
  //     .then(() => console.log("confirmed sign up"))
  //     .catch(err => console.log(err));
  // };

  return (
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
        type="text"
        placeholder="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button className="w-full bg-blue-500 py-5">Sing Up</button>
    </form>
  );
};
export default SingUpForm;
