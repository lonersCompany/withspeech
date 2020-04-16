import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SingUpForm = (params) => {
  const [username, setUsername] = useState("simon@loners.company");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState(false);
  const [emailPosted, setEmailPosted] = useState(true);
  const [verificationCode, setVerificationCode] = useState("307694");

  let history = useHistory();

  const handleVerification = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(verificationCode);
    const mfaType = "SOFTWARE_TOKEN_MFA";
    const responseAuth = Auth.confirmSignIn(
      username,
      verificationCode,
      mfaType
    );

    responseAuth
      .then((msg) => {
        history.push("/dashboard");
        console.log(msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <span role="img" aria-label="" description="Envelope">
                ✉️
              </span>
            </p>
            <p className="font-light mb-5">
              Check your E-mail, we send you verification code :)
            </p>
            <div>
              <form onSubmit={handleVerification}>
                <input
                  className="mb-5 bg-gray-800 border border-gray-300 rounded-lg py-5 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  placeholder="code"
                  name="code"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </form>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4">
                  Log In{" "}
                  <span role="img" aria-label="" description="wave hand">
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
                <span role="img" aria-label="" description="sad emoji">
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
