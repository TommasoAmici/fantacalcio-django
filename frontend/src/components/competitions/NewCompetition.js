import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { newLeague } from "../../actions";
import { FormFields, RenderField } from "../Fields";
import { StringsNewCompetition } from "../../localization/Strings";
import { isNumeric } from "validator/lib/isNumeric";
import { isLength } from "validator/lib/isLength";
import {
  KeyboardArrowDownIcon,
  EditIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "mdi-react";

function validate(formProps) {
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
  } else if (parseInt(formProps.matchdays, 10) < 1) {
    errors.matchdays = StringsNewCompetition.negativeMatchdays;
  } else if (parseInt(formProps.matchdays, 10) > MAXMATCHDAYS) {
    errors.matchdays = StringsNewCompetition.invalidMatchdays;
  }

  if (!formProps.firstMatch) {
    errors.firstMatch = StringsNewCompetition.noFirstMatch;
  } else if (!isNumeric(formProps.firstMatch)) {
    errors.firstMatch = StringsNewCompetition.negativeMatchdays;
  } else if (parseInt(formProps.firstMatch, 10) < 1) {
    errors.firstMatch = StringsNewCompetition.negativeMatchdays;
  } else if (parseInt(formProps.firstMatch, 10) > MAXMATCHDAYS) {
    errors.firstMatch = StringsNewCompetition.invalidMatchdays;
  }

  if (!formProps.lastMatch) {
    errors.lastMatch = StringsNewCompetition.noFirstMatch;
  } else if (!isNumeric(formProps.lastMatch)) {
    errors.lastMatch = StringsNewCompetition.negativeMatchdays;
  } else if (parseInt(formProps.lastMatch, 10) < 1) {
    errors.lastMatch = StringsNewCompetition.negativeMatchdays;
  } else if (parseInt(formProps.lastMatch, 10) > MAXMATCHDAYS) {
    errors.lastMatch = StringsNewCompetition.invalidMatchdays;
  } else if (
    parseInt(formProps.firstMatch, 10) > parseInt(formProps.lastMatch, 10)
  ) {
    errors.lastMatch = StringsNewCompetition.lastMatchBeforeFirstMatch;
  }
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
      <div className="">
        <h2>{StringsNewCompetition.titleCreate}</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <Accordion title={StringsNewCompetition.general}>
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
          <Accordion title={StringsNewCompetition.calendar}>
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
          <Accordion title={StringsNewCompetition.bonuses}>
            <FormFields>
              <Field
                name="goals"
                type="number"
                component={RenderField}
                label={StringsNewCompetition.goals}
                size={"1-6"}
              />
            </FormFields>
          </Accordion>
          <Accordion title={StringsNewCompetition.teams}>
            <FormFields>
              <Field
                name="numberOfTeams"
                type="number"
                min="1"
                component={RenderField}
                label={StringsNewCompetition.numberOfTeams}
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
