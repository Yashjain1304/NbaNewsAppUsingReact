import React from "react";

import NewsSlider from "./widgets/Slider.js";
import NewsList from "./widgets/NewsList/newsList.js";
import VideoList from "./widgets/VideosList/VideoList.js";

const Home = () => {
  return (
    <div>
      <NewsSlider
        types="featured"
        start={0}
        end={5}
        settings={{
          dots: false,
        }}
      />
      <NewsList type="card" loadmore={true} start={0} amount={3} />
      <VideoList
        type="card"
        title={true}
        loadMore={true}
        start={0}
        amount={3}
      />
    </div>
  );
};
export default Home;
