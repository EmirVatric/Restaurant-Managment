import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";
import Kitchen from "../components/kitchen/Index";

export default (
  <Router>
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <Navbar>
            <Home />
          </Navbar>
        )}
      />
      <Route path="/kitchen" exact component={Kitchen} />
    </Switch>
  </Router>
);
