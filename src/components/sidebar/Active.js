import React from "react";
import "../../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faTag } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "reactstrap";
import { Link } from "react-router-dom";

class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: {
        one: false,
        two: false,
      },
    };
  }

  toggleFilter(e) {
    this.setState({
      toggle: {
        [e.target.id]: !this.state.toggle[e.target.id],
      },
    });
  }

  render() {
    return (
      <div>
        <Nav vertical className="list-unstyled pb-3">
          <Link to={"/City"}>
            <li
              className={this.state.toggle.one ? "selected" : "unselected"}
              id="one"
              tag={Link}
              onClick={this.toggleFilter.bind(this)}
            >
              <FontAwesomeIcon icon={faMap} className="mr-2" />
              City
            </li>
          </Link>
          <Link to={"/Tags"}>
            <li
              tag={Link}
              className={this.state.toggle.two ? "selected" : "unselected"}
              id="two"
              onClick={this.toggleFilter.bind(this)}
            >
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Tags
            </li>
          </Link>
        </Nav>
      </div>
    );
  }
}
export default Active;
