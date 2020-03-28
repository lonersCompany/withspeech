import React, { Component } from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SingUpPage from "./components/SingUpPage";
import PrivacyPolicy from "./components/PrivacyPolicy";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Authenticator, SignIn } from "aws-amplify-react";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  // Requirement 3.
  // It checks if the user is authenticated, if they are,
  // it renders the "component" prop. If not, it redirects
  // the user to /login.
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);

function App() {
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
