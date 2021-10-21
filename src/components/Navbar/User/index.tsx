import React, { useState } from "react";
import { Link } from "react-router-dom";

// * REDUX
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/userSlice";
import { getMemorizedNumItems } from "../../../redux/cartSlice";

// * MATERIAL UI
import Badge from "@material-ui/core/Badge";
import { Menu, MenuItem } from "@mui/material";
import { Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

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
    username: {
      fontStyle: "bold",
      margin: "0.5em",
      color: "blue",
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      color: "#ffffff",
    },
    menu: {
      background: "linear-gradient(to right, #F37335, #FDC830)",
      display: "flex",
      flexDirection: "column",
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
  const numItems = useAppSelector(getMemorizedNumItems);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const RenderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.menu}>
        <Link to="/products/new" className={classes.links}>
          <IconButton>
            <AddCircleIcon className={classes.icon} />
          </IconButton>
        </Link>
        <Link to="/cart" className={classes.links}>
          <IconButton>
            <Badge badgeContent={numItems} color="secondary">
              <ShoppingCartIcon className={classes.icon} />
            </Badge>
          </IconButton>
        </Link>
        <Link to="/user/logout" className={classes.links}>
          <IconButton className={classes.iconWrapper}>
            <LogoutIcon className={classes.icon} />
          </IconButton>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <section className={classes.sectionDesktop}>
        <Link to="/products/new" className={classes.links}>
          <IconButton>
            <AddCircleIcon className={classes.icon} />
          </IconButton>
        </Link>
        <Link to="/cart" className={classes.links}>
          <IconButton>
            <Badge badgeContent={numItems} color="secondary">
              <ShoppingCartIcon className={classes.icon} />
            </Badge>
          </IconButton>
        </Link>
        <Typography className={classes.greeting} component="span">
          Welcome
          <Typography className={classes.username} component="span">
            {username}
          </Typography>
        </Typography>
        <Link to="/user/logout" className={classes.links}>
          <IconButton aria-label="log out" className={classes.iconWrapper}>
            <LogoutIcon className={classes.icon} />
          </IconButton>
        </Link>
      </section>
      <section className={classes.sectionMobile}>
        <IconButton size="medium" onClick={handleMobileMenuOpen}>
          <MoreIcon />
        </IconButton>
        {RenderMobileMenu}
      </section>
    </div>
  );
};
