import React, { Component } from "react";

import Header from "../components/Calendar/Header";
import CalendarArea from "../components/Calendar/CalendarArea";

class Calendar extends Component {
  render() {
    return (
      <div>
        <Header />
        <CalendarArea />
      </div>
    );
  }
}

export default Calendar;
