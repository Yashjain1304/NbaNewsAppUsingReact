import React from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";
import styles from "./slider.module.css";

const SliderTemplates = (props) => {
  console.log(props);
  let template = null;

  const settings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props.settings,
  };

  switch (props.types) {
    case "featured":
      template = props.news.map((item, i) => {
        return (
          <div key={i}>
            <div className={styles.featured_item}>
              <div
                className={styles.featured_image}
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              ></div>
              <Link to={`/articles/${item.id}`}>
                <div className={styles.featured_caption}>{item.title}</div>
              </Link>
            </div>
          </div>
        );
      });
      break;
    default:
      template = null;
  }
  console.log(props);
  return <Slick {...settings}>{template}</Slick>;
};
export default SliderTemplates;
