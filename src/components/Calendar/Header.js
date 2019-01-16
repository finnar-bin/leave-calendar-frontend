import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import banner from "../../assets/banner.png";
import Search from "./Header/Search";
import UserInfo from "./Header/UserInfo";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    backgroundColor: "#ADADBC",
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 5}px`
  },
  logo: {
    width: "100%"
  },
  headerText: {
    color: "#312f2f"
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.container}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <Grid container direction="row">
              <Grid item sm={3}>
                <img src={banner} alt="logo" className={classes.logo} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Search />
          </Grid>
          <Grid item xs={12} sm={4}>
            <UserInfo />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
