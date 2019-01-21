import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "../components/Calendar/Header";
import CalendarArea from "../components/Calendar/CalendarArea";
import Info from "../components/Calendar/Info";
import Updates from "../components/Calendar/Updates";
import Footer from "../components/Footer/Footer";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Calendar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Header />
        <div style={{ padding: 8 }}>
          <Grid
            className={classes.root}
            spacing={16}
            container
            direction="row"
            justify="center"
          >
            <Grid item xs={12} sm={8}>
              <CalendarArea />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={16}>
                <Info />
                <Updates />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Calendar);
