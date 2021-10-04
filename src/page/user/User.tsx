import React from "react";
import { Route, Switch } from "react-router-dom";
import { login } from "./Login/Login";
import { Signup } from "./Signup/Signup";

export const User = (props: RouteComponentProps) => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
      </Switch>
    </div>
  );
};
