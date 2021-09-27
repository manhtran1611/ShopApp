import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProductsList } from "./components/ProductList";
import { Signup } from "./components/User/Signup";
import { Login } from "./components/User/Login";
import { SingleProductPage } from "./components/ProductList/SingleProductPage";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" render={(props) => <Signup {...props} />} />
          <Route
            path="/products/:id"
            render={(props) => <SingleProductPage {...props} />}
          />
          <Route exact path="/" component={ProductsList} />
        </Switch>
      </div>
    </>
  );
};

export default App;
