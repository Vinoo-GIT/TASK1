import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";
import City from "../../City";
import Tags from "../../Tags";
import "../../style.css";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/" component={() => <City />} />
      <Route exact path="/city" component={() => <City />} />
      <Route exact path="/Tags" component={() => <Tags />} />
    </Switch>
  </Container>
);

export default Content;
