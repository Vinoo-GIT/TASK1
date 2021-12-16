import React from "react";
import classNames from "classnames";
import Active from "./Active";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>React CRUD</h3>
    </div>

    <div className="side-menu">
      <Active />
    </div>
  </div>
);

export default SideBar;
