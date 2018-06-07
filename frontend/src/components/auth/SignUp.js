import React from "react";
//import TelegramLoginButton from 'react-telegram-login';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registerUser } from "../../actions";
import { FormFields, RenderField, validatePassword } from "../Fields";
import { StringsLogin } from "../../localization/Strings";
import { isEmail, isLength } from "validator";
import {
  AccountCircleIcon,
  AlternateEmailIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CheckCircleIcon
} from "mdi-react";

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = StringsLogin.noUsername;
  } else if (!isLength(formProps.username, { min: 1, max: 15 })) {
    errors.username = StringsLogin.invalidUsername;
  }

  if (!formProps.email) {
    errors.email = StringsLogin.noEmail;
  } else if (!isEmail(formProps.email)) {
    errors.email = StringsLogin.invalidEmail;
  }

  if (!formProps.password1) {
    errors.password1 = StringsLogin.noPassword;
  } else if (!validatePassword(formProps.password1)) {
    errors.password1 = StringsLogin.invalidPassword;
  }

  if (!formProps.password2) {
    errors.password2 = StringsLogin.noPassword;
  } else if (!validatePassword(formProps.password2)) {
    errors.password2 = StringsLogin.invalidPassword;
  }

  return errors;
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password1: "",
      password2: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit = values => {
    this.props.registerUser(values, this.props.history);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const { password1, password2, showPassword } = this.state;
    const errorStyle = {
      color: "#d32f2f"
    };

    return (
      <div className="uk-flex-center uk-position-center login-form" uk-grid>
        <div className="uk-align-center">Telegram Widget</div>
        <hr />
        <div className="">
          <form
            onSubmit={handleSubmit(this.submit)}
            className="uk-form-stacked"
          >
            <FormFields>
              <Field
                name="username"
                type="text"
                component={RenderField}
                label="Username"
                icon={<AccountCircleIcon />}
              />
            </FormFields>

            <FormFields>
              <Field
                name="email"
                type="text"
                component={RenderField}
                label="Email"
                icon={<AlternateEmailIcon />}
              />
            </FormFields>
            <FormFields>
              <Field
                label="Password"
                name="password1"
                password={true}
                type={showPassword ? "text" : "password"}
                onChange={this.handleChange}
                component={RenderField}
                icon={
                  password1 === password2 && validatePassword(password1) ? (
                    <a
                      className="uk-form-icon uk-form-icon-flip no-underline"
                      onClick={this.handleClickShowPassword}
                    >
                      <CheckCircleIcon className={"valid-style"} />
                    </a>
                  ) : (
                    <a
                      className="uk-form-icon uk-form-icon-flip no-underline"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon
                          style={
                            !validatePassword(password1) && password1.length > 0
                              ? errorStyle
                              : null
                          }
                        />
                      ) : (
                        <VisibilityIcon
                          style={
                            !validatePassword(password1) && password1.length > 0
                              ? errorStyle
                              : null
                          }
                        />
                      )}
                    </a>
                  )
                }
              />
            </FormFields>
            <FormFields>
              <Field
                label={StringsLogin.repeatPassword}
                name="password2"
                password={true}
                type={showPassword ? "text" : "password"}
                onChange={this.handleChange}
                component={RenderField}
                icon={
                  password1 === password2 && validatePassword(password1) ? (
                    <a
                      className="uk-form-icon uk-form-icon-flip no-underline"
                      onClick={this.handleClickShowPassword}
                    >
                      <CheckCircleIcon className={"valid-style"} />
                    </a>
                  ) : (
                    <a
                      className="uk-form-icon uk-form-icon-flip no-underline"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon
                          style={
                            !validatePassword(password2) && password2.length > 0
                              ? errorStyle
                              : null
                          }
                        />
                      ) : (
                        <VisibilityIcon
                          style={
                            !validatePassword(password2) && password2.length > 0
                              ? errorStyle
                              : null
                          }
                        />
                      )}
                    </a>
                  )
                }
              />
            </FormFields>

            <Link className="" to="/reset_password">
              {StringsLogin.resetPassword}
            </Link>
            <br />
            <p uk-margin>
              <Link
                className="uk-button uk-button-secondary uk-width-1-1"
                to={{
                  pathname: "/login"
                }}
              >
                {StringsLogin.login}
              </Link>
              <button
                disabled={pristine || submitting || invalid}
                className="uk-button uk-button-primary uk-width-1-1"
                type="submit"
              >
                {StringsLogin.signup}
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const form = reduxForm({
  form: "signup",
  validate
});

export default connect(
  mapStateToProps,
  { registerUser }
)(form(SignUp));
