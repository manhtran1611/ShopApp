import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { AddNewProduct } from "../../components/AddNewProduct";
import { SingleProductPage } from "../../components/ProductList/SingleProductPage";
export const Product = (props: RouteComponentProps) => {
  return (
    <div>
      <Switch>
        <Route
          path="/products/new"
          render={(props) => <AddNewProduct {...props} />}
        />
        <Route path="/products/:id/" component={SingleProductPage} />
      </Switch>
    </div>
  );
};
