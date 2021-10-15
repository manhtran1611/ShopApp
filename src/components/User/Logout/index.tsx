import React, { useEffect } from "react";
import { Avatar, makeStyles, Theme, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logoutUser } from "../../../redux/userSlice";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export const Logout = (props: RouteComponentProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }, [history, dispatch]);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CheckCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        You signed out successfully
      </Typography>
    </div>
  );
};
