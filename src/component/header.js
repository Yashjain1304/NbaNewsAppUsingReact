import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";

import SideNav from "./SideNav.js";
import FontAwesome from "react-fontawesome"



const Header = (props) => {

    const navBars = () => {
        return <div>
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
                style={{
                color: "#fff",
                padding: "10px",
                cursor:"pointer"
            }} />
        </div>
    }
    
    const logo = () => {
        return (
            <Link to="/"><img alt="nba logo" src="/images/nba_logo.png"></img></Link>
        );
    }

    console.log(style);

    return <header className={style.header}>
        <SideNav {...props}/>
        <div className={style.headerOpt}>
             {navBars()}
             {logo()}
        </div>
    </header>
    // return <div>header</div>
}
export default Header;