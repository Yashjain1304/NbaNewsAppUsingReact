import React, { Component } from "react";
import styles from "./dashboard.module.css";
import FormFields from "../widgets/formField/formfield.js";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { firebase, firebaseTeams, firebaseArticles } from "../../firebase.js";

import Uploader from "../widgets/fileuploader/fileuploader.js";
class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    loading: false,
    formdata: {
      author: {
        element: "input",
        value: "",
        config: {
          name: "author_input",
          type: "author",
          placeholder: "Enter your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      title: {
        element: "input",
        value: "",
        config: {
          name: "title_input",
          type: "title",
          placeholder: "Enter the title",
        },

        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      body: {
        element: "text_editor",
        value: "",
        valid: true,
      },
      image: {
        element: "image",
        value: "",
        valid: true,
      },
      team: {
        element: "select",
        value: "",
        config: {
          name: "team_input",
          options: [],
        },

        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once("value").then((snapshot) => {
      let teams = [];

      snapshot.forEach((child) => {
        teams.push({
          id: child.val().teamId,
          name: child.val().city,
        });
      });
      const newFormdata = { ...this.state.formdata };
      const newElement = { ...newFormdata["team"] };
      newElement.config.options = teams;
      newFormdata["team"] = newElement;
      // console.log(newFormdata);
      this.setState({
        formdata: newFormdata,
      });
    });
  };

  updateForm = (element, content = "") => {
    const newFormdata = {
      ...this.state.formdata,
    };
    const newElement = {
      ...newFormdata[element.id],
    };
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      // console.log(validData);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    // console.log(newFormdata);
    // console.log(newFormdata);
    this.setState({
      formdata: newFormdata,
    });
  };

  validate = (element) => {
    let error = [true, ""];

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = !valid ? "This field is required" : "";
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  submitButton = () => {
    return this.state.loading ? (
      "loading"
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
    }
    for (let key in this.state.formdata) {
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    console.log(dataToSubmit, "data to submit");
    if (formIsValid) {
      let articleId = null;
      // console.log(dataToSubmit);
      this.setState({
        loading: true,
        postError: "",
      });
      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then((snapshot) => {
          // console.log(snapshot);
          snapshot.forEach((childSnapshot) => {
            articleId = childSnapshot.val().id;
          });
          // console.log(articleId);
          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["id"] = articleId + 1;
          dataToSubmit["team"] = parseInt(dataToSubmit["team"]);

          firebaseArticles
            .push(dataToSubmit)
            .then((article) => {
              this.props.history.push(`/articles/${article.key}`);
            })
            .catch((err) => {
              this.setState({
                postError: err.message,
              });
            });
        });
    } else {
      console.log("errororieig");
      this.setState({
        postError: "Something went wrong",
      });
    }
  };

  showError = () => {
    return this.state.postError !== "" ? (
      <div
        style={{
          color: "red",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        {this.state.postError}
      </div>
    ) : (
      ""
    );
  };

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState);
    let html = stateToHTML(contentState);

    // console.log(rawState);
    this.updateForm({ id: "body" }, html);
    this.setState({
      editorState,
    });
  };

  storeFilename = (filename) => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>
          <FormFields
            id="author"
            formdata={this.state.formdata.author}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id="title"
            formdata={this.state.formdata.title}
            change={(element) => this.updateForm(element)}
          />
          <Editor
            editorState={this.state.editorState}
            //   toolbarClassName="toolbarClassName"
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <FormFields
            id="team"
            formdata={this.state.formdata.team}
            change={(element) => this.updateForm(element)}
          />
          <Uploader filename={(filename) => this.storeFilename(filename)} />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
export default Dashboard;
