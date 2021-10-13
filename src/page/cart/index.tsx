import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Cart } from "../../components/Cart";
export const CartRoute = (props: RouteComponentProps) => {
  return (
    <div>
      <Switch>
        <Route path="/cart" render={(props) => <Cart {...props} />} />
      </Switch>
    </div>
  );
};
