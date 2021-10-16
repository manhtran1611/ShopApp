import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogTitle } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dialog: {
    opacity: "0.2",
  },
});

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

export const Popup = (props: PopupProps) => {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth="sm"
      className={classes.dialog}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
        }}
      >
        Please login first
      </DialogTitle>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button href="#/user/login" variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
