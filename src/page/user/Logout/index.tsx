import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Logout } from "../../../components/User/Logout";
export const LogoutRoute = (props: RouteComponentProps) => {
  return <Logout {...props} />;
};
