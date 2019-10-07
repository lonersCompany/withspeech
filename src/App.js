import React from "react";
import WsFile from "./components/WsFile";
import Nav from "./components/nav";
import WsDashboard from "./components/WsDashboard";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" exact component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
