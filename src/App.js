import React from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SingUpPage from "./components/SingUpPage";
import PrivacyPolicy from "./components/PrivacyPolicy";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SingUpPage} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <Route path="/dashboard" component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default App;
