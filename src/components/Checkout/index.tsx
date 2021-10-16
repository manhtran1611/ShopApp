import React, { useEffect } from "react";
import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { RouteComponentProps, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundSize: "100% auto",
    backgroundRepeat: "repeat-y",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
export const Checkout = (props: RouteComponentProps) => {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 5000);
  }, [history]);
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CheckCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        You have checked out successfully. Please check your email for more
        information!
      </Typography>
    </div>
  );
};
