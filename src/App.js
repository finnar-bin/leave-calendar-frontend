import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component imports
import SelectUser from "./views/SelectUser";
import Calendar from "./views/Calendar";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SelectUser} />
      <Route path="/calendar" component={Calendar} />
    </Switch>
  </Router>
);

export default App;
