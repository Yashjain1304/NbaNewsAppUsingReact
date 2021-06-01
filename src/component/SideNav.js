import React from "react";
import SideNavigation from "react-simple-sidenav";

import SideNavitem from "./sideNavitem.js";
const SideNav = (props) => {
  return (
    <div>
      <SideNavigation
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: "#dfdfdf",
          maxWidth: "220px",
        }}
      >
        <SideNavitem {...props} />
      </SideNavigation>
    </div>
  );
};

export default SideNav;
