import React from "react";

const EventPropGetter = event => {
  switch (event.status) {
    case "Approved":
      return {
        style: {
          backgroundColor: "#3f51b5"
        }
      };

    case "Pending":
      return {
        style: {
          backgroundColor: "#f50057"
        }
      };

    case "Holiday":
      return {
        style: {
          backgroundColor: "#F05223"
        }
      };

    default:
      break;
  }
};

export default EventPropGetter;
