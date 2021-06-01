import React, { Component } from "react";
import axios from "axios";
import { URL } from "../config.js";
import NewsList from "../component/widgets/NewsList/newsList.js";
import NewsSlider from "../component/widgets/Slider.js";

class NewsTemplate extends Component {
    
    state = {
        article: [],
        teams: []
    }
    render() {
        return <div>
            <NewsSlider types="featured"
                settings={{ dots: false }}
                start={0}
                end={3}
            />
            <NewsList start={0} amount={10} type={"cardnew"} loadMore={+true}/>
        </div>
    }
}
export default NewsTemplate;