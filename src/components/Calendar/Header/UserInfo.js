import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

const randomColor = () => {
  const colors = ["#E91E63", "#4CAF50", "#FF5722", "#673AB7"];
  const max = colors.length;
  return colors[Math.floor(Math.random() * max)];
};

const styles = {
  root: {
    textAlign: "center",
    float: "right"
  },
  avatar: {
    margin: 10,
    color: "#fff",
    cursor: "pointer",
    backgroundColor: randomColor()
  }
};

class UserInfo extends Component {
  state = {
    anchorEl: null
  };

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <Tooltip title="Open User Menu">
          <Avatar
            aria-label="Open User Menu"
            aria-owns={anchorEl ? "user-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.avatar}
          >
            NC
          </Avatar>
        </Tooltip>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>My Profile</MenuItem>
          <MenuItem>Switch User</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(UserInfo);
