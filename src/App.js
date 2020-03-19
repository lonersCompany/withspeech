import React, { useState } from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App bg-gray-900 text-white w-full max-w-screen-xl mx-auto">
      <Router>
        <Route path="/" exact component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
