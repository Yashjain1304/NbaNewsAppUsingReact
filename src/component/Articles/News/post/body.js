import React from "react";
import styles from "../../Article.module.css";
const Body = (props) => {
  return (
    <div className={styles.articleBody}>
      <h1>{props.articleData.title}</h1>
      <div
        className={styles.articleImage}
        style={{ background: `url('${props.imageurl}')` }}
      ></div>
      <div
        className={styles.articleText}
        dangerouslySetInnerHTML={{
          __html: props.articleData.body,
        }}
      ></div>
    </div>
  );
};
export default Body;
