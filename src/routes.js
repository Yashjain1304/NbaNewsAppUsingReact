import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./component/home.js";
import Layout from "./hoc/layout.js";

import VideoArticle from "./component/Articles/videoArticle/video/index.js";
import NewsArticles from "./component/Articles/News/post/index.js";
import NewsTemplate from "./NewsTemplate/NewsTemplate.js";
import VideoTemplates from "./videoTemplate/VideoTemplate.js";

import SignIn from "./component/SignIn/SignIn.js";
import Dashboard from "./component/Dashboard/dashboard.js";

import PrivateRoutes from "./component/AuthRoutes/PrivateRoutes.js";
import PublicRoutes from "./component/AuthRoutes/publicRoutes.js";

const Routes = (props) => {
  // console.log(this.props);
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoutes
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/news"
          exact
          component={NewsTemplate}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/video"
          exact
          component={VideoTemplates}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/articles/:id"
          exact
          component={NewsArticles}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          path="/videos/:id"
          exact
          component={VideoArticle}
        />
        <PublicRoutes
          {...props}
          path="/sign-in"
          restricted={true}
          exact
          component={SignIn}
        />

        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
