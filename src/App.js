import React, { useState, useEffect } from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SingUpPage from "./components/SingUpPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { Auth } from "aws-amplify";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
//import { Authenticator, SignIn } from "aws-amplify-react";

const ionViewCanEnter = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (e) {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    console.log("now");
    (async () => {
      const checkLog = await ionViewCanEnter();
      setAuth(checkLog);
    })();
  }, []);

  return (
    // Requirement 3.
    // It checks if the user is authenticated, if they are,
    // it renders the "component" prop. If not, it redirects
    // the user to /login.
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/singin" component={SingUpPage} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <Route path="/dashboard/" component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default App;
