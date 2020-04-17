import React from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
//https://d1zvu8f5vu3lhe.cloudfront.net/
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/privacy_policy" component={PrivacyPolicy} />
        <Route path="/dashboard" component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default App;
