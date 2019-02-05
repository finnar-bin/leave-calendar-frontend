import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component imports
import SelectUser from "./views/SelectUser";
import Calendar from "./views/Calendar";
import Admin from "./views/Admin";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SelectUser} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </Router>
);

export default App;
