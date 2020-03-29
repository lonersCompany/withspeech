import React, { useEffect } from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SingUpPage from "./components/SingUpPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { Hub } from "aws-amplify";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//import { Authenticator, SignIn } from "aws-amplify-react";

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

const fakeAuth = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
  // Requirement 3.
  // It checks if the user is authenticated, if they are,
  // it renders the "component" prop. If not, it redirects
  // the user to /login.
  <Route
    {...rest}
    render={props =>
      fakeAuth === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function App() {
  // useEffect(() => {
  //   console.log("useEffect");
  //   Hub.listen("auth", data => {
  //     const { payload } = data;
  //     console.log("A new auth event has happened: ", data);
  //     if (payload.event === "signIn") {
  //       console.log("a user has signed in!");

  //       <Redirect to="/login" />;
  //     }
  //     if (payload.event === "signOut") {
  //       console.log("a user has signed out!");
  //     }
  //   });
  // }, []);

  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/singin" component={SingUpPage} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <PrivateRoute path="/dashboard/" component={WsDashboard} />
        <PrivateRoute path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default App;
