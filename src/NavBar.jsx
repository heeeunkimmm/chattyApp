
import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    return (
      <nav className="navbar">
       <a href="/" className="navbar-brand">Chatty</a>
       <span className="online-users"> { this.props.userCount } user(s) online </span>
      </nav>
    );
  };
};
export default NavBar;
