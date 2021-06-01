import React from "react";
import VideoTemplate from "./VideoTemplate.js";
import styles from "./videolist.module.css";

const VideoRelated = (props) => {
    return <div className={styles.relatedWrapper}>
            <VideoTemplate data={props.data} teams={props.teams}/>
    </div>
    // return <VideoTemplate/>    
}
export default VideoRelated;