import React from "react";
import { RouteComponentProps } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  checkout,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from "../../redux/cartSlice";

// * MATERIAL UI
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    table: {
      width: "600px",
      backgroundColor: "#f1f1f1",
      margin: "0 auto",
      borderRadius: "1em",
      padding: "1em",
      borderSpacing: "5px",
      marginBottom: "2em",
      "& tbody, & td": {
        padding: "0.5em",
        backgroundColor: "white",
      },
      "& tfoot, & td": {
        fontWeight: "bold",
      },
    },
    total: { color: "green" },
    button: {
      border: "none",
      fontSize: "24px",
      padding: "1em",
    },
    form: {
      display: "flex",
      alignItems: "center",
    },
    input: { fontSize: "1em", width: "3em" },
    errorBox: { color: "red" },
  })
);

export const Cart = (props: RouteComponentProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.items);
  console.log(cart);
  const products = useAppSelector((state) => state.productsReducer.entities);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector(
    (state) => state.cartReducer.checkoutState
  );
  console.log(checkoutState);
  function onQuantityChange(e: React.FocusEvent<HTMLInputElement>, id: string) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkout());
  }

  return (
    <main className={classes.page}>
      <h1>Shopping Cart</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cart).map(([id, quantity]) => (
            <tr>
              <td>{products[id]?.name} </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={products[id]?.quantity}
                  className={classes.input}
                  defaultValue={quantity}
                  onBlur={(e) => onQuantityChange(e, id)}
                />
              </td>
              <td>${products[id]?.price} </td>
              <td>
                <button
                  aria-label={`Remove ${products[id]?.name}  from Shopping Cart`}
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {cart && (
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td className={classes.total}>${totalPrice}</td>
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
      <form onSubmit={onCheckout}>
        {cart === {} || checkoutState === "pending" ? (
          <Button disabled>Checkout</Button>
        ) : (
          <Button type="submit" variant="contained">
            Checkout
          </Button>
        )}
      </form>
    </main>
  );
};
