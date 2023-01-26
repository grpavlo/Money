import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main/Main"
import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Reset from "./Reset/Reset"
import Income from "./Income/Income"
import Operations from "./Operations/Operations";


function App() {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/Registration" component={Registration} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/forgot" component={Reset} />
            <Route exact path="/income" component={Income} />
            <Route exact path="/Operations" component={Operations} />

        </Switch>
      </Router>
  );
}

export default App;
