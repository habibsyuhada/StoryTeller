import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import v1_test from "./view/v1/test";
import v1_setup from "./view/v1/setup";

class App extends Component {
  constructor() {
    super();
    //Setting up global variable
    global.socketlink = socketIOClient('https://sky-serverst.herokuapp.com/');

  }
  render() {
    return (
      <Router>
        <div>
          {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav> */}

          <div className="container-fluid mt-3">
            <Switch>
              {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
              <Route exact path="/" component={v1_setup} />
              <Route exact path="/play" component={v1_test} />
              <Route exact path="/tutorials" component={TutorialsList} />
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
