import React from "react";
import styles from "./formfield.module.css";

const FormFields = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className={styles.labelError}>{formdata.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplates = (props) => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => {
                change({ event, id, blur: false });
              }}
              onBlur={(event) => change({ event, id, blur: true })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            <select
              value={formdata.value}
              name={formdata.config.name}
              onChange={(event) => {
                change({ event, id, blur: false });
              }}
              onBlur={(event) => change({ event, id, blur: true })}
            >
              {formdata.config.options.map((item, i) => {
                return (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplates()}</div>;
};

export default FormFields;
