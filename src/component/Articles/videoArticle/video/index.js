import React, { Component } from "react";
// import Header from "./header";
// import axios from "axios";
// import { URL } from "../../../../config.js";
import styles from "../videoarticle.module.css";

import Header from "./header.js";
import VideoRelated from "../../../widgets/VideosList/videoRelated.js";

import {
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
  firebaseVideos,
} from "../../../../firebase";
class VideoArticle extends Component {
  state = {
    video: [],
    team: [],
    teams: [],
    related: [],
  };
  componentWillMount() {
    // axios.get(${URL}/)
    // axios
    //   .get(`${URL}/videos?id=${this.props.match.params.id}`)
    //   .then((response) => {
    //     let video = response.data[0];
    //     axios.get(`${URL}/teams?id=${video.team}`).then((response) => {
    //       // console.log(response ,"team response")
    //       this.setState({
    //         video,
    //         team: response.data,
    //       });
    //       this.getRelated();
    //     });
    //   });

    // using firebase
    firebaseDB
      .ref(`/videos/${this.props.match.params.id}`)
      .once("value")
      .then((snapshot) => {
        const video = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(video.team)
          .once("value")
          .then((snapshot) => {
            const team = snapshot.val();
            this.setState({
              video,
              team,
            });
            this.getRelated();
          });
      });
  }

  getRelated = () => {
    // console.log(this.state);
    //using live server
    // axios.get(`${URL}/teams`).then((response) => {
    //   let teams = response.data;
    //   axios
    //     .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
    //     .then((response) => {
    //       this.setState({
    //         teams,
    //         related: response.data,
    //       });
    //     });
    // });
    //using firebase
    firebaseTeams.once("value").then((snapshot) => {
      const teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild("team")
        .equalTo(this.state.video.team)
        .limitToFirst(3)
        .once("value")
        .then((snapshot) => {
          const related = firebaseLooper(snapshot);
          this.setState({
            teams,
            related,
          });
        });
    });
  };

  render() {
    const video = this.state.video;
    const team = this.state.team;
    // console.log(this.state,"inside video article")
    return (
      <div>
        <Header teamData={team[0]} />
        <div className={styles.videoWrapper}>
          <h1>{video.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${video.url}`}
          ></iframe>
          <VideoRelated data={this.state.related} teams={this.state.teams} />
        </div>
      </div>
    );
  }
}

export default VideoArticle;
