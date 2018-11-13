import React from "react";
import { NavLink } from "react-router-dom";

import error from "../../assets/gif/error.gif";

let styles = {
  main__wrapper: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    position: "absolute"
  },
  content__wrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
};

const Error503 = () => (
  <div className="text-center container-fluid" style={styles.main__wrapper}>
    <div style={styles.content__wrapper}>
      <img src={error} alt="error" />
      <h1 className="alert-heading display-3">Something happened!</h1>
      <hr />
      <p>
        It was at this grueling day that something bad....{" "}
        <strong>REAL BAD</strong> happened.
      </p>
      <p>
        <NavLink to="/" className="btn btn-outline-success mx-2">
          Go back...
        </NavLink>
        <a
          href="#findOutMore"
          className="btn btn-outline-info mx-2"
          data-toggle="collapse"
        >
          Find out more...
        </a>
      </p>
      <div className="collapse" id="findOutMore">
        <div className="alert alert-danger">
          <h5 className="alert-heading">Problem connecting to database host</h5>
          <hr />
          <p>
            Please report via email to{" "}
            <a
              href="mailto:lunar.cuenca@nchcss.com?Subject=Leave%20Calendar%20Error"
              className="alert-link"
            >
              lunar.cuenca@nchcss.com
            </a>{" "}
            or hit me up on Skype:{" "}
            <a href="skype:live:lunar.cuenca?chat" className="alert-link">
              live:lunar.cuenca
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Error503;
