import React from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Menu, MenuItem } from "@mui/material";

import { useAppSelector } from "../../../redux/hooks";
import { getMemorizedNumItems } from "../../../redux/cartSlice";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      textDecoration: "none",
    },
    icon: {
      fill: "snow",
      padding: "0",
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

export const Guest = () => {
  const classes = useStyles();
  const numItems = useAppSelector(getMemorizedNumItems);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
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
        <Link to="/cart" className={classes.links}>
          <IconButton>
            <Badge badgeContent={numItems} color="secondary">
              <ShoppingCartIcon className={classes.icon} />
            </Badge>
          </IconButton>
        </Link>
        <IconButton>
          <Link to="/user/register" className={classes.links}>
            <SupervisorAccountIcon className={classes.icon} />
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/user/login" className={classes.links}>
            <AccountCircle className={classes.icon} />
          </Link>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <section>
      <div className={classes.sectionDesktop}>
        <Link to="/cart" className={classes.links}>
          <IconButton>
            <Badge badgeContent={numItems} color="secondary">
              <ShoppingCartIcon className={classes.icon} />
            </Badge>
          </IconButton>
        </Link>
        <IconButton>
          <Link to="/user/register" className={classes.links}>
            <SupervisorAccountIcon className={classes.icon} />
          </Link>
        </IconButton>
        <IconButton edge="end">
          <Link to="/user/login" className={classes.links}>
            <AccountCircle className={classes.icon} />
          </Link>
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton size="medium" onClick={handleMobileMenuOpen}>
          <MoreIcon />
        </IconButton>
      </div>
      {RenderMobileMenu}
    </section>
  );
};
