import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Menu, MenuItem } from "@mui/material";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
        <Link to="/user/register" className={classes.links}>
          <IconButton>
            <SupervisorAccountIcon className={classes.icon} />
          </IconButton>
        </Link>
        <Link to="/user/login" className={classes.links}>
          <IconButton>
            <AccountCircle className={classes.icon} />
          </IconButton>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <section>
      <div className={classes.sectionDesktop}>
        <Link to="/user/register" className={classes.links}>
          <IconButton>
            <SupervisorAccountIcon className={classes.icon} />
          </IconButton>
        </Link>
        <Link to="/user/login" className={classes.links}>
          <IconButton edge="end">
            <AccountCircle className={classes.icon} />
          </IconButton>
        </Link>
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
