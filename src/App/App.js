import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Calendar from '../Calendar/Calendar'
import Search from '../Search/Search'
import Navbar from '../Navbar/Navbar'
import './App.css'

let styles = {}

styles.main__wrapper = {
  boxShadow: '15px 15px 35px black',
  border: 0
}

styles.body__wrapper = {
  padding: '2%'
}

class App extends Component {
  render() {
    return(
      <div className="card" style={styles.main__wrapper}>
        <Router>
          <Fragment>
            <div className="nav__wrapper">
              <Navbar />
            </div>
            <div style={styles.body__wrapper}>
              <Switch>
                <Route exact path="/" component={Calendar} />
                <Route path="/search/:name" component={Search} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </div>
    )
  }
}


export default App;
