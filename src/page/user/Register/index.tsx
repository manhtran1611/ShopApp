import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Register } from "../../../components/User/Register";
export const RegisterRoute = (props: RouteComponentProps) => {
  return <Register {...props} />;
};
