import React from "react";
import { Link, withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
// import style from "./sideNav.css"
import { firebase } from "../firebase";
import style from "./sidenav.module.css";

const SideNavitem = (props) => {
  console.log(props, "inside side nav items");
  const items = [
    {
      type: style.option,
      icon: "home",
      text: "Home",
      link: "/",
      login: "",
    },
    {
      type: style.option,
      icon: "file-text-o",
      text: "News",
      link: "/news",
      login: "",
    },
    {
      type: style.option,
      icon: "play",
      text: "Video",
      link: "/video",
      login: "",
    },
    {
      type: style.option,
      icon: "sign-in",
      text: "Dashboard",
      link: "/dashboard",
      login: false,
    },
    {
      type: style.option,
      icon: "sign-in",
      text: "Sign-in",
      link: "/sign-in",
      login: true,
    },
    {
      type: style.option,
      icon: "sign-out",
      text: "Sign Out",
      link: "/sign-out",
      login: false,
    },
  ];

  console.log(items);

  const element = (item, i) => {
    return (
      <div key={i} className={item.type}>
        <Link to={item.link}>
          <FontAwesome name={item.icon} />
          {item.text}
        </Link>
      </div>
    );
  };

  const restricted = (item, i) => {
    let template = null;
    if (props.user === null && item.login) {
      template = element(item, i);
    }
    if (props.user !== null && !item.login) {
      if (item.link === "/sign-out") {
        template = (
          <div
            key={i}
            className={item.type}
            style={{ cursor: "pointer" }}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.history.push("/");
                });
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </div>
        );
      } else {
        template = element(item, i);
      }
    }
    return template;
  };
  const showItems = () => {
    console.log("inside show items");
    return items.map((item, i) =>
      item.login !== "" ? restricted(item, i) : element(item, i)
    );
  };

  return <div>{showItems()}</div>;
};
export default withRouter(SideNavitem);
