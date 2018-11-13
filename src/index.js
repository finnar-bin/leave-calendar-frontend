import React from "react";
import ReactDOM from "react-dom";

// FotAwesome imports
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faCheckCircle,
  faHourglassHalf
} from "@fortawesome/fontawesome-free-solid";
import {
  faCalendarCheck,
  faUserCircle
} from "@fortawesome/fontawesome-free-regular";

// Redux imports
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./App/store/reducers/rootReducer";

// Other imports
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

// Font awesome setup
fontawesome.library.add(
  faChevronLeft,
  faChevronRight,
  faCalendarCheck,
  faEdit,
  faCheckCircle,
  faHourglassHalf,
  faUserCircle
);

// Redux setup
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
