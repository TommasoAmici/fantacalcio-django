import React from "react";

export class FormFields extends React.Component {
  render() {
    return (
      <div className="uk-margin" uk-margin="true">
        <div className="uk-inline uk-width-1-1">{this.props.children}</div>
      </div>
    );
  }
}

export function MaterialIcon(props) {
  if (props.error) {
    return (
      <a className="uk-form-icon uk-form-icon-flip no-underline">
        <i
          className="material-icons"
          style={props.style}
          uk-tooltip={"title: " + props.error + ";pos:right;"}
        >
          {props.icon}
        </i>
      </a>
    );
  } else {
    return (
      <span className="uk-form-icon uk-form-icon-flip">
        <i className="material-icons" style={props.style}>
          {props.icon}
        </i>
      </span>
    );
  }
}

const errorStyle = {
  color: "#d32f2f"
};

export function makeIcons(touched, error, icon) {
  return (
    <div>
      {touched ? (
        error ? (
          <MaterialIcon icon="error" error={error} style={errorStyle} />
        ) : (
          <MaterialIcon icon={icon} />
        )
      ) : (
        <MaterialIcon icon={icon} />
      )}
    </div>
  );
}

export function renderField({
  input,
  placeholder,
  icon,
  type,
  meta: { touched, error }
}) {
  return (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={
          touched ? (error ? "uk-input error" : "uk-input") : "uk-input"
        }
      />
      {/* password fields have visibility toggle instead of an icon */}
      {placeholder && placeholder.indexOf("assword") !== -1
        ? null
        : makeIcons(touched, error, icon)}
    </div>
  );
}

export function validatePassword(password) {
  return password.length > 8 && /\d/.test(password);
}
