import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { registerUser, selectUser } from "../../../redux/userSlice";
import { InputUser } from "../../../interface";
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
    color: "red",
    fontSize: "1em",
  },
}));

export const Register = (props: RouteComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectUser);
  const { status, error } = useAppSelector((state) => state.userReducer);
  console.log(status);
  console.log(error);
  const { register, handleSubmit } = useForm<InputUser>();
  const onSubmit: SubmitHandler<InputUser> = (user) => {
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (status === "succeeded") {
      history.push("/");
    }
  }, [status, dispatch, history, token]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {status === "succeeded" ? (
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              required={true}
              fullWidth
              autoFocus
              margin="normal"
              label="Username"
              type="text"
              {...register("name")}
            />
            <TextField
              variant="outlined"
              required={true}
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              FormHelperTextProps={{
                className: classes.helperText,
              }}
              helperText={error}
              {...register("password")}
            />
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};
