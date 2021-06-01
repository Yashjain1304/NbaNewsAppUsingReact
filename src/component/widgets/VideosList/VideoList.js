import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardInfo from "../../Cardinfo/Cardinfo.js";
import styles from "./videolist.module.css";
// import axios from "axios";
// import { URL } from "../../../config.js";
import Button from "../button/button.js";

import VideoTemplate from "./VideoTemplate.js";

import {
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
} from "../../../firebase.js";

class VideoList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount,
  };
  renderTitle = () => {
    return this.props.title ? (
      <h3>
        <strong>NBA</strong>Videos
      </h3>
    ) : null;
  };
  loadmore = () => {
    let end = this.state.end + this.state.amount;
    // console.log(this.state,"inside loadmore of video")
    // this.setState({
    //     start: this.state.end,
    //     end: this.state.end + this.state.amount
    // });
    // console.log(this.state,"inside video load more")
    this.request(this.state.end + 1, end);
  };

  renderButton = () => {
    return this.props.loadMore ? (
      <Button
        type="loadmore"
        loadmore={() => this.loadmore()}
        cta="Load More Videos"
      />
    ) : (
      <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    );
  };

  componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    // if (this.state.teams.length < 1) {
    //     axios.get(`${URL}/teams`).then(response => this.setState({
    //         teams: response.data
    //     }))
    // }
    // axios.get(`${URL}/videos?_start=${start}&_end=${end}`).then(response => {
    //     this.setState({
    //         videos:[...this.state.videos,...response.data],
    //         start : start,
    //         end :end
    //     })
    // })
    if (this.state.teams.length < 1) {
      firebaseTeams.once("value").then((snapshot) => {
        console.log("inside videoList snapshot", snapshot);
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams,
        });
      });
    }

    firebaseVideos
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value")
      .then((snapshot) => {
        const videos = firebaseLooper(snapshot);
        this.setState({
          videos: [...this.state.videos, ...videos],
          start,
          end,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  renderVideos = () => {
    let template = null;

    switch (this.props.type) {
      case "card":
        template = (
          <VideoTemplate data={this.state.videos} teams={this.state.teams} />
        );
        break;
      default:
        template = null;
    }
    return template;
  };

  render() {
    console.log(this.state.videos);
    return (
      <div className={styles.videoList_wrapper}>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
      </div>
    );
  }
}
export default VideoList;
