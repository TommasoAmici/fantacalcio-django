import React from "react";
import { ErrorIcon } from "mdi-react";

export class FormFields extends React.Component {
  render() {
    return (
      <div className="uk-margin" uk-margin="true">
        <div className="uk-width-1-1">{this.props.children}</div>
      </div>
    );
  }
}

export class RenderField extends React.Component {
  render() {
    const {
      input,
      icon,
      type,
      size,
      min,
      label,
      password,
      placeholder,
      meta: { touched, error }
    } = this.props;
    const baseClass = "uk-input uk-width-" + size;
    var formIcon;
    if (password) {
      formIcon = icon;
    } else if (touched && error) {
      formIcon = (
        <span className="uk-form-icon uk-form-icon-flip">
          <ErrorIcon className={"error-style"} />
        </span>
      );
    } else {
      formIcon = <span className="uk-form-icon uk-form-icon-flip">{icon}</span>;
    }
    return (
      <div>
        <div>
          <label className="uk-form-label">{label}</label>
          <div className={"uk-inline uk-width-1-1"}>
            <input
              {...input}
              type={type}
              placeholder={placeholder}
              className={touched && error ? baseClass + " error" : baseClass}
              min={min}
            />
            {formIcon}
          </div>
        </div>
        {touched && error ? (
          <label className="uk-form-label form-label-error">{error}</label>
        ) : null}
      </div>
    );
  }
}

export function validatePassword(password) {
  return password.length > 8 && /\d/.test(password);
}
