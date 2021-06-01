import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA5CvCB9R9zmFkNJhQwUVNmWfez9q4DXxo",
  authDomain: "nba-news-786cb.firebaseapp.com",
  databaseURL: "https://nba-news-786cb-default-rtdb.firebaseio.com",
  projectId: "nba-news-786cb",
  storageBucket: "nba-news-786cb.appspot.com",
  messagingSenderId: "278480797333",
  appId: "1:278480797333:web:56777933cd78157b3ba59c",
  measurementId: "G-E9741N2HNE",
};

firebase.initializeApp(firebaseConfig);

const firebaseLooper = (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
};
