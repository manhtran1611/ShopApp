import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/userSlice";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
    greeting: {
      fontSize: "1.25em",
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      padding: "0 1em",
    },
    icon: {
      color: "#ffffff",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "1em",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export const User = () => {
  const classes = useStyles();
  const user = useAppSelector(selectUser);
  const username = user[0].name;
  console.log(user);
  return (
    <div>
      <section className={classes.sectionDesktop}>
        <Typography className={classes.greeting} component="span">
          Hello {username}{" "}
        </Typography>
        <IconButton aria-label="log out" className={classes.iconWrapper}>
          <Link to="/user/logout" className={classes.links}>
            <LogoutIcon className={classes.icon} />
          </Link>
        </IconButton>
      </section>
      <section className={classes.sectionMobile}>
        <IconButton aria-label="log out" className={classes.icon}>
          <Link to="/user/logout" className={classes.links}>
            <LogoutIcon />
          </Link>
        </IconButton>
      </section>
    </div>
  );
};
