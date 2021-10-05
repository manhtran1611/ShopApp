import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ProductsList } from "../components/ProductList";
import { Product } from "./product";
import { User } from "./user/User";

export const HomePage: React.FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/user" render={(props) => <User {...props} />} />
          <Route path="/products" component={Product} />
        </Switch>
      </div>
    </div>
  );
};
