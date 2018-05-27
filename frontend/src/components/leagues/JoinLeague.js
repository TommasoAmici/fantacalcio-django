import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { newLeague } from "../../actions";
import { FormFields, renderField } from "../auth/AuthFields";
import { StringsNewLeague } from "../../localization/Strings";

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = StringsNewLeague.noName;
  } else if (formProps.name.length > 40) {
    errors.name = StringsNewLeague.invalidName;
  }

  return errors;
}

class JoinLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit = values => {
    this.props.newLeague(values);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { name, showPassword } = this.state;
    const errorStyle = {
      color: "#d32f2f"
    };
    return (
      <div className="uk-width-3-4@s ">
        <h2>Create new league</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <FormFields>
            <Field
              name="name"
              type="text"
              component={renderField}
              placeholder={StringsNewLeague.name}
              icon="group"
            />
          </FormFields>
          <FormFields>
            <Field
              name="name"
              type="text"
              component={renderField}
              placeholder={StringsNewLeague.name}
              icon="group"
            />
          </FormFields>
          <FormFields>
            <Field
              name="name"
              type="text"
              component={renderField}
              placeholder={StringsNewLeague.name}
              icon="group"
            />
          </FormFields>
          <FormFields>
            <Field
              name="name"
              type="text"
              component={renderField}
              placeholder={StringsNewLeague.name}
              icon="group"
            />
          </FormFields>
          <p uk-margin={true}>
            <Link
              className="uk-button uk-button-secondary uk-width-1-1"
              to={{
                pathname: "/dashboard/new-league"
              }}
            >
              {StringsNewLeague.joinLeague}
            </Link>
            <button
              disabled={pristine || submitting}
              className="uk-button uk-button-primary uk-width-1-1"
              type="submit"
            >
              {StringsNewLeague.newLeague}
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
  form: "joinleague",
  validate
});

export default connect(mapStateToProps, { newLeague })(form(JoinLeague));
