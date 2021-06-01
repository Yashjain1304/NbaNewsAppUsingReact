import React from "react";
import TeamInfo from "../../Elements/Teaminfo.js";
import PostData from "../../Elements/postData.js";

const Header = (props) => {

    const teamInfos = (team) => {
        return team ? (
            <TeamInfo teams={team} />
        ) : null;
    }

    const postData = (date, author) => {
        console.log("post data call");
        return <PostData
            data={{date, author}}
        />
    }

    return (
        <div>
            {teamInfos(props.teamData)}
            {postData(props.date, props.author)}
        </div>
    );
}
export default Header;