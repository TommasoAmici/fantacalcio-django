import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { joinLeague } from "../../actions";
import { FormFields, renderField } from "../auth/AuthFields";
import { StringsNewLeague } from "../../localization/Strings";
import { VpnKeyIcon, ErrorIcon } from "mdi-react";
import axios from "axios";
import UIkit from "uikit";
import { isUUID, isLength } from "validator";

/*
 * View to join a league using access code
 * TO DO: email invites 
 */

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = StringsNewLeague.noTeamName;
  } else if (!isLength(formProps.name, { min: 1, max: 40 })) {
    errors.name = StringsNewLeague.invalidName;
  }

  if (!formProps.accessCode) {
    errors.accessCode = StringsNewLeague.noAccessCode;
  } else if (!isUUID(formProps.accessCode)) {
    errors.accessCode = StringsNewLeague.invalidAccessCode;
  }

  return errors;
}

class FindLeague extends React.Component {
  render() {
    const {
      touched,
      accessCode,
      handleChange,
      setTouched,
      errorStyle,
      getLeague
    } = this.props;
    return (
      <form className="uk-form-stacked">
        <div class="uk-inline uk-width-1-1">
          <input
            name="accessCode"
            value={accessCode}
            onChange={handleChange}
            required={touched && !isUUID(accessCode)}
            className="uk-input"
            type="text"
            onBlur={setTouched}
            placeholder={StringsNewLeague.accessCode}
          />
          <a
            className="uk-form-icon uk-form-icon-flip"
            uk-tooltip={
              touched && isUUID(accessCode)
                ? null
                : "title:" + StringsNewLeague.invalidAccessCode + ";pos:right"
            }
          >
            {touched && !isUUID(accessCode) ? (
              <ErrorIcon style={errorStyle} />
            ) : (
              <VpnKeyIcon />
            )}
          </a>
        </div>

        <p uk-margin={true}>
          <button
            disabled={isUUID(accessCode) ? false : true}
            className="uk-button uk-button-primary uk-width-1-1"
            onClick={getLeague}
          >
            {StringsNewLeague.joinLeague}
          </button>
        </p>
      </form>
    );
  }
}

class AreYouSure extends React.Component {
  render() {
    const { name, accessCode, goBack, joinLeagueToggle } = this.props;
    return (
      <div>
        <p>
          {StringsNewLeague.formatString(
            StringsNewLeague.areYouSure,
            <b>{name}</b>
          )}
        </p>
        <p uk-margin={true}>
          <button
            disabled={accessCode && accessCode.length > 0 ? false : true}
            className="uk-button uk-button-secondary uk-width-1-2"
            onClick={goBack}
          >
            {StringsNewLeague.no}
          </button>
          <button
            disabled={accessCode && accessCode.length > 0 ? false : true}
            className="uk-button uk-button-primary uk-width-1-2"
            onClick={joinLeagueToggle}
          >
            {StringsNewLeague.yes}
          </button>
        </p>
      </div>
    );
  }
}

class JoinLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: "",
      name: "",
      touched: false,
      joining: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getLeague = this.getLeague.bind(this);
    this.goBack = this.goBack.bind(this);
    this.joinLeagueToggle = this.joinLeagueToggle.bind(this);
    this.setTouched = this.setTouched.bind(this);
  }

  submit = values => {
    values = { ...values, access_code: this.state.accessCode };
    this.props.joinLeague(values, this.props.history);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  goBack() {
    this.setState({ name: "" });
  }
  setTouched() {
    this.setState({ touched: true });
  }
  joinLeagueToggle() {
    this.setState({ joining: true });
  }
  async getLeague(event) {
    event.preventDefault();
    if (isUUID(this.state.accessCode)) {
      axios
        .get("/leagues/" + this.state.accessCode + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("user"),
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => {
          this.setState({ name: response.data.name });
        })
        .catch(error => {
          UIkit.notification(StringsNewLeague.errorJoin, "danger");
        });
    } else {
      this.setState({ invalidCode: true, accessCode: "" });
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { accessCode, name, touched, joining } = this.state;
    const errorStyle = {
      fill: "#d32f2f"
    };

    var joinForm;
    if (name && name.length > 0) {
      if (joining) {
        joinForm = (
          <form
            onSubmit={handleSubmit(this.submit)}
            className="uk-form-stacked"
          >
            <FormFields>
              <Field
                name="name"
                type="text"
                component={renderField}
                placeholder={StringsNewLeague.teamName}
                icon="edit"
              />
            </FormFields>
            <FormFields>
              <Field
                name="history"
                type="text"
                component="textarea"
                placeholder={StringsNewLeague.history}
                icon="edit"
                className="uk-textarea"
              />
            </FormFields>

            {/* TO DO UPLOAD FIELD FOR TEAM LOGO */}

            <p uk-margin>
              <button
                disabled={pristine || submitting}
                className="uk-button uk-button-primary uk-width-1-1"
                type="submit"
              >
                {StringsNewLeague.joinLeague}
              </button>
            </p>
          </form>
        );
      } else {
        joinForm = (
          <AreYouSure
            name={name}
            joinLeagueToggle={this.joinLeagueToggle}
            goBack={this.goBack}
            accessCode={accessCode}
          />
        );
      }
    } else {
      joinForm = (
        <FindLeague
          touched={touched}
          accessCode={accessCode}
          handleChange={this.handleChange}
          setTouched={this.setTouched}
          errorStyle={errorStyle}
          getLeague={this.getLeague}
        />
      );
    }

    return (
      <div className="uk-width-3-4@s ">
        <h2>{StringsNewLeague.titleJoin}</h2>
        {joinForm}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const form = reduxForm({
  form: "joinleague",
  validate
});

export default connect(mapStateToProps, { joinLeague })(form(JoinLeague));
