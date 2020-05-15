import React from "react";
import { Switch, Route } from "react-router-dom";
import Start from "../components/Start/Start";
import Create from "../components/Create/Create";
import Pass from "../components/Pass/Pass";
import Result from "../components/Result/Result";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Start} />
      <Route path="/create" exact component={Create} />
      <Route path="/pass" exact component={Pass} />
      <Route path="/result" exact component={Result} />
    </Switch>
  );
};

export default Router;
