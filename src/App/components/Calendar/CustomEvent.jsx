import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

let styles = {
  badge: {
    display: "inline-block",
    padding: ".25em .4em",
    lineHeight: "1",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: ".25rem",
    color: "#fff",
    backgroundColor: "#f8f9fa38"
  }
};

const splitString = string => {
  let split = string.split(" ");
  return split[0];
};

const CustomEvent = ({ event }) => {
  if (event.status === "Holiday") {
    return (
      <div className="text-center" data-tip={event.name}>
        <ReactTooltip />
        <strong>{event.name}</strong>
      </div>
    );
  }
  return (
    <div className="container" data-tip data-for="eventDataTip">
      <ReactTooltip id="eventDataTip">
        <span>Click for more info</span>
      </ReactTooltip>
      <div className="row justify-content-center">
        <div className="col-md-auto p-0">
          <strong>{splitString(event.name)}</strong>
        </div>
      </div>
    </div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.object
};

export default CustomEvent;
