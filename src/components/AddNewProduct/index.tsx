import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { InputProduct } from "../../interface";
import { addNewProduct } from "../../redux/productsSlice";
import { selectUser } from "../../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "82vh",
    backgroundSize: "100% auto",
    backgroundRepeat: "repeat-y",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helperText: {
    fontSize: "1em",
    color: "red",
  },
}));

export const AddNewProduct = (props: RouteComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectUser);
  const status = useAppSelector((state) => state.productsReducer.status);
  console.log(status);

  const user = {
    _id: data[0]._id,
    name: data[0].name,
  };
  console.log(user);
  const { register, handleSubmit } = useForm<InputProduct>();
  const onSubmit: SubmitHandler<InputProduct> = (product) => {
    product.user = user;
    console.log(product);
    dispatch(addNewProduct(product));
  };
  useEffect(() => {
    if (status === "succeeded") {
      history.push("/");
    }
  }, [status, history, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Product name"
          autoFocus
          {...register("name")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Description"
          type="text"
          {...register("description")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Image URL"
          type="text"
          {...register("image")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Price"
          type="number"
          {...register("price")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Quantity"
          type="number"
          {...register("quantity")}
        />
        <Button
          type="submit"
          value="Login"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Product
        </Button>
      </form>
    </Container>
  );
};
