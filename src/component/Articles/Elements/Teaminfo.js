import React from "react";
import styles from "../Article.module.css";

const TeamInfo = (props) => {
    return (
        <div className={styles.articleTeamHeader}>
            <div className={styles.left}
                style={{background:`url("/images/teams/${props.teams.logo}")`}}
            >
            </div>
            <div className={styles.right}>
                <div>
                    <span>{props.teams.city} {props.teams.name }</span>
                </div>
                <div>
                    <span>
                        <strong>
                            W-{props.teams.stats[0].wins}
                            L-{props.teams.stats[0].defeats}
                        </strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
 
export default TeamInfo;