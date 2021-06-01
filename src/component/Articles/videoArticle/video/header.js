import React from "react";
import TeamInfo from "../../Elements/Teaminfo.js";


const Header = (props) => {

    const teaminfo = (team) => {
        return team ? <TeamInfo teams={team}/> : null;
    }

    return (
        <div>
        {teaminfo(props.teamData)}
        </div>
    );
    
}

export default Header;