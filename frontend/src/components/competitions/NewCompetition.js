import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { newLeague } from "../../actions";
import { FormFields, renderField } from "../auth/AuthFields";
import { StringsNewCompetition } from "../../localization/Strings";
import { isNumeric, isLength } from "validator";
import { KeyboardArrowDownIcon } from "mdi-react";

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = StringsNewCompetition.noName;
  } else if (!isLength(formProps.name, { min: 1, max: 40 })) {
    errors.name = StringsNewCompetition.invalidName;
  }

  if (!formProps.matchdays) {
    errors.matchdays = StringsNewCompetition.noMatchdays;
  } else if (!isNumeric(formProps.matchdays)) {
    errors.matchdays = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.matchdays < 1) {
    errors.matchdays = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.matchdays > 38) {
    errors.matchdays = StringsNewCompetition.invalidMatchdays;
  }

  return errors;
}

class NewCompetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  submit = values => {
    this.props.newLeague(values, this.props.history);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="uk-width-3-4@s ">
        <h2>{StringsNewCompetition.titleCreate}</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <FormFields>
            <Field
              name="name"
              type="text"
              component={renderField}
              placeholder={StringsNewCompetition.name}
              icon="edit"
            />
          </FormFields>

          <FormFields>
            <Field
              name="matchdays"
              type="number"
              component={renderField}
              size={"1-4"}
              placeholder={StringsNewCompetition.matchdays}
            />
          </FormFields>

          <FormFields>
            <div className="uk-margin">
              <div uk-form-custom="target: > * > span:first-child">
                <select>
                  <option value="">
                    {StringsNewCompetition.competitionFormat}
                  </option>
                  <option value="1">{StringsNewCompetition.season}</option>
                  <option value="2">
                    {StringsNewCompetition.singleElimination}
                  </option>
                  <option value="3">
                    {StringsNewCompetition.doubleElimination}
                  </option>
                  <option value="4">{StringsNewCompetition.roundRobin}</option>
                </select>
                <button
                  className="uk-button uk-button-default"
                  type="button"
                  tabindex="-1"
                >
                  <span />
                  <span>
                    <KeyboardArrowDownIcon />
                  </span>
                </button>
              </div>
            </div>
          </FormFields>

          <p uk-margin={true}>
            <button
              disabled={pristine || submitting}
              className="uk-button uk-button-primary uk-width-1-1"
              type="submit"
            >
              {StringsNewCompetition.button}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const form = reduxForm({
  form: "newcompetition",
  validate
});

export default connect(
  mapStateToProps,
  { newLeague }
)(form(NewCompetition));
