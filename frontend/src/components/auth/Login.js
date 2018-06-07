import React from "react";
//import TelegramLoginButton from 'react-telegram-login';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { loginUser } from "../../actions";
import { FormFields, RenderField, validatePassword } from "../Fields";
import UIkit from "uikit";
import { StringsLogin } from "../../localization/Strings";
import { isEmail } from "validator";
import {
  AlternateEmailIcon,
  VisibilityOffIcon,
  VisibilityIcon
} from "mdi-react";

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = StringsLogin.noEmail;
  } else if (!isEmail(formProps.email)) {
    errors.email = StringsLogin.invalidEmail;
  }

  if (!formProps.password) {
    errors.password = StringsLogin.noPassword;
  } else if (!validatePassword(formProps.password)) {
    errors.password = StringsLogin.invalidPassword;
  }

  return errors;
}

class LoginForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  submit = values => {
    this.props.loginUser(values, this.props.history);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  errorMessage() {
    if (this.props.errorMessage) {
      return UIkit.notification(this.props.errorMessage, "danger");
    }
  }

  render() {
    const showPassword = this.state.showPassword;
    const { handleSubmit, pristine, submitting, invalid } = this.props;

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
                name="email"
                type="text"
                component={RenderField}
                label="Email"
                size={"1-1"}
                icon={<AlternateEmailIcon />}
              />
            </FormFields>

            <FormFields>
              <Field
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                component={RenderField}
                password={true}
                size={"1-1"}
                icon={
                  <a
                    className="uk-form-icon uk-form-icon-flip no-underline"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </a>
                }
              />
            </FormFields>

            <Link className="" to="/reset_password">
              {StringsLogin.resetPassword}
            </Link>
            <br />
            <p uk-margin>
              <button
                disabled={pristine || submitting || invalid}
                className="uk-button uk-button-primary uk-width-1-1"
                type="submit"
              >
                {StringsLogin.login}
              </button>
              <Link
                className="uk-button uk-button-secondary uk-width-1-1"
                to="/signup"
              >
                {StringsLogin.signup}
              </Link>
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
  form: "signin",
  validate
});

export default connect(
  mapStateToProps,
  { loginUser }
)(form(LoginForm));
