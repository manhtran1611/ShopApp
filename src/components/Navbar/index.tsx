import React from "react";
import { Link } from "react-router-dom";
import { User } from "./User";
import { Guest } from "./Guest";
// * REDUX
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
//  * MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: "linear-gradient(to right, #F37335, #FDC830)",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      color: "white",
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "center",
        color: "white",
      },
    },
    links: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export const Navbar = () => {
  const classes = useStyles();
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="static" className={classes.container}>
      <Toolbar>
        <Link to="/" className={classes.links}>
          <IconButton>
            <ShoppingBasketIcon className={classes.menuButton} />
          </IconButton>
          <Typography
            component="span"
            className={classes.title}
            variant="h6"
            noWrap
          >
            Shop App
          </Typography>
        </Link>
        <div className={classes.grow} />
        {user.length > 0 ? <User /> : <Guest />}
      </Toolbar>
    </AppBar>
  );
};
