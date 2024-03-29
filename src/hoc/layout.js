import React, { Component } from "react";
import "./layout.css";
import Header from "../component/header.js";
import Footer from "../component/footer.js";
class Layout extends Component {
  state = {
    showNav: false,
  };

  toggleSidenav = (action) => {
    this.setState({
      showNav: action,
    });
  };

  render() {
    return (
      <div>
        <Header
          user={this.props.user}
          showNav={this.state.showNav}
          onHideNav={() => this.toggleSidenav(false)}
          onOpenNav={() => this.toggleSidenav(true)}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
