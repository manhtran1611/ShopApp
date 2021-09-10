import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./app/Navbar";
import { ProductsList } from "./features/product/ProductsList";
import { Signup } from "./features/Signup/Signup";
import { Login } from "./features/Login/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/" component={ProductsList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
