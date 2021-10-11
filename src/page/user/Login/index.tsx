import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Login } from "../../../components/User/Login";
export const LoginRoute = (props: RouteComponentProps) => {
  return <Login {...props} />;
};
