import React from "react";
import VideoList from "../component/widgets/VideosList/VideoList"
const VideoTemplates = () => {
    return (
        <div>
            <VideoList title={false} type={"card"} start={0} amount={10} loadMore={true}/>
        </div>
    );
}

export default VideoTemplates;