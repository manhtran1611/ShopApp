import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { InputUser } from "../../../interface";
import { loginUser, selectUser } from "../../../redux/userSlice";

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

export const Login = (props: RouteComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectUser);
  const userStatus = useAppSelector((state) => state.userReducer.status);
  console.log(userStatus);
  const { register, handleSubmit } = useForm<InputUser>();
  const onSubmit: SubmitHandler<InputUser> = (user) => {
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (userStatus === "succeeded") {
      history.push("/");
    }
  }, [userStatus, token, history, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {userStatus === "succeeded" ? (
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
              helperText="Wrong password"
            />
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
                <Link href="/user/register" variant="body2">
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
