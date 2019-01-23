import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = {
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center"
  }
};

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer>
        <Typography variant="overline" className={classes.root}>
          Developed with <FavoriteBorderIcon style={{ fontSize: "inherit" }} />{" "}
          by Nar Cuenca
        </Typography>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
