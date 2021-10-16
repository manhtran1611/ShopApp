import React from "react";
import { RouteComponentProps } from "react-router";
import { Checkout } from "../../components/Checkout";

export const CheckoutRoute = (props: RouteComponentProps) => {
  return (
    <div>
      <Checkout {...props} />
    </div>
  );
};
