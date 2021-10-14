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
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
      "&:focus": {
        width: "20em",
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search something"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.grow} />
        {user.length > 0 ? <User /> : <Guest />}
      </Toolbar>
    </AppBar>
  );
};
