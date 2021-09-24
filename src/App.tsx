import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
// import { Router, Switch, Route } from "react-router-dom";
import Navbar from "./app/Navbar";
import { ProductsList } from "./features/product/ProductsList";
import { Signup } from "./features/Signup/Signup";
import { Login } from "./features/Login/Login";
import { SingleProductPage } from "./features/product/SingleProductPage";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/products/:id" component={SingleProductPage} />
          <Route exact path="/" component={ProductsList} />
        </Switch>
      </div>
    </>
  );
};

export default App;
