import React from "react";
import WsFile from "./components/WsFile";
import WsDashboard from "./components/WsDashboard";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app/" component={WsDashboard} />
        <Route path="/doc/:id" component={WsFile} />
      </Router>
    </div>
  );
}

export default App;
