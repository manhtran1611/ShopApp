import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProductDataService from "../../services/products";

//  * MATERIAL UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = (props: any) => {
  type FormValues = {
    name: string;
    password: string;
  };

  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);
  // const [wrongPassword, setError] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    ProductDataService.loginUser(data)
      .then((response) => {
        setSubmitted(true);
        console.log(response);
      })
      .then(() => {
        setTimeout(() => {
          setSubmitted(false);
          props.history.push("/");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        // setError(true);
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
            Sign in
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
            {/* {wrongPassword && (
              <div>
                <Typography variant="body2">Wrong password</Typography>
              </div>
            )} */}
            <Button
              type="submit"
              value="Login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
};
