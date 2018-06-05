import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { editLeague } from "../../actions";
import { FormFields, renderField } from "../auth/AuthFields";
import {
  StringsNewLeague,
  StringsLeagueSettings
} from "../../localization/Strings";
import { isLength } from "validator";
import LoadingSpinner from "../spinner/LoadingSpinner";
import "./League.css";

/*
 * league settings view
 */

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    //errors.name = StringsNewLeague.noName;
  } else if (!isLength(formProps.name, { min: 1, max: 40 })) {
    errors.name = StringsNewLeague.invalidName;
  }

  return errors;
}

class SettingsLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: {}
    };
  }

  submit = values => {
    if (values.name === undefined) {
      values.name = this.state.league.name;
    }
    values = { ...values, accessCode: this.state.league.accessCode };
    this.props.editLeague(values);
  };

  componentDidMount() {
    this.setState({ league: this.props.league });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.league !== this.props.league) {
      this.setState({ league: this.props.league });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const league = this.state.league;

    const editLeagueForm = (
      <form
        onSubmit={handleSubmit(this.submit)}
        enableReinitialize={true}
        className="uk-form-stacked"
      >
        <FormFields>
          <Field
            className={"team-name-field"}
            name="name"
            type="text"
            component={renderField}
            placeholder={league.name ? league.name : "Team name"}
            placeholderAsValue={true}
            icon="edit"
          />
        </FormFields>
        <FormFields>
          <Field
            name="history"
            type="text"
            component="textarea"
            placeholder={StringsLeagueSettings.history}
            icon="edit"
            className="uk-textarea"
          />
        </FormFields>

        <p uk-margin>
          <button
            disabled={submitting}
            className="uk-button uk-button-primary uk-width-1-1"
            type="submit"
          >
            {StringsLeagueSettings.update}
          </button>
        </p>
      </form>
    );
    if (this.state.league === null) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className="uk-width-3-4@s ">
          <h2>{StringsLeagueSettings.title}</h2>
          {editLeagueForm}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { league: state.user.league };
}

const form = reduxForm({
  form: "editleague",
  validate
});

export default connect(
  mapStateToProps,
  { editLeague }
)(form(SettingsLeague));
