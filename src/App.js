import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component imports
import SelectUser from "./views/SelectUser";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SelectUser} />
    </Switch>
  </Router>
);

export default App;
