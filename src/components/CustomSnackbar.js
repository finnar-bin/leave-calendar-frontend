import React, { Component } from "react";
import classNames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

const variantIcon = {
  success: CheckCircleRoundedIcon,
  error: ErrorRoundedIcon
};

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class CustomSnackbar extends Component {
  state = {
    open: false
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      this.setState({ open: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open });
    }
  }

  render() {
    const { classes, variant, message } = this.props;
    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          aria-describedby="custom-snackbar"
          message={
            <span id="custom-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          className={classNames(classes[variant], classes.margin)}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CustomSnackbar);
