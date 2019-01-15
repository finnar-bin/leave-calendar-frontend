import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import banner from "../assets/banner.png";
import InputArea from "../components/SelectUser/InputArea";

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#ADADBC"
  },
  container: {
    height: "100vh",
    textAlign: "center"
  },
  logo: {
    width: "80%"
  }
};

class SelectUser extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.container}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item sm={6}>
            <img src={banner} alt="banner" className={classes.logo} />
          </Grid>
          <Grid item sm={6}>
            <InputArea />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SelectUser);
