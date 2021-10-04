import React from "react";
import { Route, Switch } from "react-router-dom";
import { SingleProductPage } from "../../components/ProductList/SingleProductPage";
export const Product = () => {
  return (
    <div>
      <Switch>
        <Route path="/:id/" component={SingleProductPage} />
      </Switch>
    </div>
  );
};
