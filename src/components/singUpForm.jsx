import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SingUpForm = (params) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState(false);
  const [emailPosted, setEmailPosted] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const responseAuth = Auth.signUp({
      username,
      password,
      attributes: { email },
    });

    responseAuth
      .then((msg) => {
        console.log(msg);
        setEmailPosted(true);
      })
      .catch((err) => {
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

      {emailPosted ? (
        <div className="mb-5 text-center mb-10">
          <div className="text-xl">
            <p className="mb-5">
              <span role="img" description="Envelope">
                ✉️
              </span>
            </p>
            <p className="font-light mb-5">
              Check your E-mail, we send you verification :)
            </p>
            <div>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4">
                  Log In{" "}
                  <span role="img" description="wave hand">
                    🖖🏼
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-5 text-center">Use your E-mail to sign up</div>
          <form onSubmit={handleSubmit}>
            <input
              className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
              type="text"
              name="username"
              placeholder="E-mail"
              onChange={(e) => {
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
              onChange={(e) => setPassword(e.target.value)}
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
            <button className="w-full bg-blue-500 py-5 mb-5">
              Create account
            </button>
          </form>
        </>
      )}
    </div>
  );
};
export default SingUpForm;
