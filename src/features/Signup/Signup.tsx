import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProductDataService from "../../services/products";

// * MATERIAL UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

export const Signup = (props: any) => {
  type FormValues = {
    name: string;
    password: string;
  };
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    ProductDataService.addUser(data)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitted(false);
          props.history.push("/");
        }, 1500);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {submitted ? (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CheckCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            You signed up successfully
          </Typography>
        </div>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              label="Username"
              autoFocus
              {...register("name")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
            />
            <Button
              type="submit"
              value="Sign up"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};
