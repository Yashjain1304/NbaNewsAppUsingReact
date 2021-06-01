import React from "react";
import style from "./cardinfo.module.css";
import moment from "moment";
import FontAwesome from "react-fontawesome";
const CardInfo = (props) => {
  const teamName = (teams, team) => {
    let data = teams.find((item) => item.teamId === team);
    if (data) {
      return data.name;
    }
  };
  const formatDate = (date) => {
    return moment(date).format(" MM-DD-YYYY");
  };
  return (
    <div className={style.cardstyle}>
      <span className={style.teamName}>
        {teamName(props.teams, props.team)}
      </span>
      <span className={style.date}>
        <fontAwesome name="clock-o" />
        {formatDate(props.date)}
      </span>
    </div>
  );
};
export default CardInfo;
