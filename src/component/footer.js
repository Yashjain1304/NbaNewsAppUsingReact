import React from "react";
import { CURRENT_YEAR } from "../config.js";
import style from "./footer.module.css";

import { Link } from "react-router-dom";
const Footer = () => {
  // const year = (new Date()).getFullYear();

  return (
    <footer className={style.footer}>
      <Link to="/" className={style.logo}>
        <img alt="nba logo" src="/images/nba_logo.png" />
      </Link>
      <div className={style.right}>
        @NBA {CURRENT_YEAR} All rights reserved.
      </div>
      <div className={style.left}>Code BY Yash</div>
    </footer>
  );
};
export default Footer;
