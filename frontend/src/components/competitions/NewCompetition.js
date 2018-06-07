import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { newLeague } from "../../actions";
import { FormFields, RenderField } from "../Fields";
import { StringsNewCompetition } from "../../localization/Strings";
import { isNumeric, isLength } from "validator";
import {
  KeyboardArrowDownIcon,
  EditIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "mdi-react";
import "./Competitions.css";

function validate(formProps) {
  console.log(formProps);
  const errors = {};
  const MAXMATCHDAYS = 38;

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
  } else if (formProps.matchdays > MAXMATCHDAYS) {
    errors.matchdays = StringsNewCompetition.invalidMatchdays;
  }

  if (!formProps.firstMatch) {
    errors.firstMatch = StringsNewCompetition.noFirstMatch;
  } else if (!isNumeric(formProps.firstMatch)) {
    errors.firstMatch = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.firstMatch < 1) {
    errors.firstMatch = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.firstMatch > MAXMATCHDAYS) {
    errors.firstMatch = StringsNewCompetition.invalidMatchdays;
  }

  if (!formProps.lastMatch) {
    errors.lastMatch = StringsNewCompetition.noFirstMatch;
  } else if (!isNumeric(formProps.lastMatch)) {
    errors.lastMatch = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.lastMatch < 1) {
    errors.lastMatch = StringsNewCompetition.negativeMatchdays;
  } else if (formProps.lastMatch > MAXMATCHDAYS) {
    errors.lastMatch = StringsNewCompetition.invalidMatchdays;
  } else if (formProps.firstMatch > formProps.lastMatch) {
    errors.lastMatch = StringsNewCompetition.lastMatchBeforeFirstMatch;
  }
  console.log(errors);
  return errors;
}

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.handleCollapse = this.handleCollapse.bind(this);
  }
  handleCollapse(e) {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { title } = this.props;
    const { collapsed } = this.state;
    return (
      <div className={"accordion"}>
        <div className={"accordion-header"}>
          <h3>{title}</h3>
          {collapsed ? (
            <ChevronUpIcon
              size={30}
              className={"collapse-toggle"}
              onClick={this.handleCollapse}
            />
          ) : (
            <ChevronDownIcon
              size={30}
              className={"collapse-toggle"}
              onClick={this.handleCollapse}
            />
          )}
        </div>

        <div
          className={
            !collapsed ? "accordion-content" : "accordion-content-hide"
          }
        >
          {this.props.children}
        </div>
        <hr />
      </div>
    );
  }
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
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div className="uk-width-3-4@s ">
        <h2>{StringsNewCompetition.titleCreate}</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <Accordion title={"General info"}>
            <FormFields>
              <Field
                name="name"
                type="text"
                component={RenderField}
                label={StringsNewCompetition.name}
                icon={<EditIcon />}
                size={"1-1"}
              />
            </FormFields>

            <FormFields>
              <div className="uk-margin">
                <div uk-form-custom="target: > * > span:first-child">
                  <label className="uk-form-label">
                    {StringsNewCompetition.competitionFormat}
                  </label>
                  <Field name="competitionFormat" component="select">
                    <option value="1">{StringsNewCompetition.season}</option>
                    <option value="2">
                      {StringsNewCompetition.singleElimination}
                    </option>
                    <option value="3">
                      {StringsNewCompetition.doubleElimination}
                    </option>
                    <option value="4">
                      {StringsNewCompetition.roundRobin}
                    </option>
                  </Field>
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
          </Accordion>
          <Accordion title={"Calendar"}>
            <FormFields>
              <Field
                name="matchdays"
                type="number"
                min="1"
                component={RenderField}
                label={StringsNewCompetition.matchdays}
                size={"1-6"}
              />
            </FormFields>

            <FormFields>
              <Field
                name="firstMatch"
                type="number"
                min="1"
                component={RenderField}
                label={StringsNewCompetition.firstMatch}
                size={"1-6"}
              />
            </FormFields>

            <FormFields>
              <Field
                name="lastMatch"
                type="number"
                min="1"
                component={RenderField}
                label={StringsNewCompetition.lastMatch}
                size={"1-6"}
              />
            </FormFields>
          </Accordion>
          <p uk-margin={true}>
            <button
              disabled={pristine || submitting || invalid}
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
  return {};
}

const form = reduxForm({
  form: "newcompetition",
  validate
});

export default connect(
  mapStateToProps,
  { newLeague }
)(form(NewCompetition));
