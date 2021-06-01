import React, { Component } from "react";
// import axios from "axios";
// import { URL } from "../../../../config.js"

import styles from "../../Article.module.css";
import Header from "./Header.js";

import Body from "./body.js";
import {
  firebase,
  firebaseDB,
  firebaseTeams,
  firebaseLooper,
} from "./../../../../firebase";

class NewsArticles extends Component {
  state = {
    article: [],
    team: [],
    imageURL: "",
  };

  componentWillMount() {
    //using live server
    // using props.match.paramas.id  to get id by url
    // axios
    //   .get(`${URL}/articles?id=${this.props.match.params.id}`)
    //   .then((response) => {
    //     console.log(response);
    //     let article = response.data[0];
    //     axios.get(`${URL}/teams?id=${article.team}`).then((response) => {
    //       console.log(response);
    //       this.setState({
    //         article,
    //         team: response.data,
    //       });
    //     });
    //   });
    // using Firebase
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once("value")
      .then((snapshot) => {
        let article = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(article.team)
          .once("value")
          .then((snapshot) => {
            const team = snapshot.val();
            this.setState({
              article,
              team,
            });
            this.getImageURL(article.image);
          });
      });
  }

  getImageURL = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          imageURL: url,
        });
      });
  };

  render() {
    console.log(this.state, "inside single article");
    const article = this.state.article;
    const team = this.state.team;
    return (
      <div className={styles.articleWrapper}>
        <Header
          teamData={team[0]}
          date={article.date}
          author={article.author}
        />
        <Body articleData={article} imageurl={this.state.imageURL} />
      </div>
    );
  }
}

export default NewsArticles;
