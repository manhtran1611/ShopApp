import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { LoginRoute } from "./Login";
import { RegisterRoute } from "./Register";

export const User = (props: RouteComponentProps) => {
  return (
    <div>
      <Switch>
        <Route
          path="/user/login"
          render={(props) => <LoginRoute {...props} />}
        />
        <Route
          path="/user/register"
          render={(props) => <RegisterRoute {...props} />}
        />
      </Switch>
    </div>
  );
};
