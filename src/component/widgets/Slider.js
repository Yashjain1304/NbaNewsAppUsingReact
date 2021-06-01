import React, { Component } from "react";
// import axios from "axios";
import SliderTemplates from "./slider_templates.js";
// import { URL } from "../../config.js";

import { firebase, firebaseArticles, firebaseLooper } from "../../firebase";

class NewsSlider extends Component {
  state = {
    news: [],
  };

  componentWillMount() {
    console.log(this.props, "inside component will mount of Slider.js");

    // using live server to fetch data
    // axios
    //   .get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
    //   .then((response) => {
    //     this.setState({
    //       news: response.data,
    //     });
    //   });
    ////////////////////////////////////////////////////////////////////////

    //using fire base
    firebaseArticles
      .limitToFirst(this.props.end)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val(), "snapshot of slider news");
        const news = firebaseLooper(snapshot);

        // news.forEach((item, i) => {
        //   firebase
        //     .storage()
        //     .ref("images")
        //     .child(item.image)
        //     .then((url) => {
        //       news[i].image = url;
        //       this.setState({
        //         news: news,
        //       });
        //     });
        // });
        const asyncFunction = (item, i, resolve) => {
          firebase
            .storage()
            .ref("images")
            .child(item.image)
            .getDownloadURL()
            .then((url) => {
              news[i].image = url;
              resolve();
            });
        };
        //let request =[]
        let requests = news.map((item, i) => {
          return new Promise((resolve) => {
            asyncFunction(item, i, resolve);
          });
        });

        Promise.all(requests).then(() => {
          this.setState({
            news,
          });
          console.log(news, " promise finish");
        });
      });
  }

  render() {
    console.log(this.state.news);
    return (
      <SliderTemplates
        news={this.state.news}
        types={this.props.types}
        settings={this.props.settings}
      />
    );
  }
}

export default NewsSlider;
