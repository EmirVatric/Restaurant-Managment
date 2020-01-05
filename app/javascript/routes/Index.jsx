import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";

export default (
  <Router>
    <Navbar>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Navbar>
  </Router>
);
