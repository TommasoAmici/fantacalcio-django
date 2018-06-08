import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { newLeague } from "../../actions";
import { FormFields, RenderField } from "../Fields";
import { StringsNewLeague } from "../../localization/Strings";
import { isLength } from "validator";
import { EditIcon } from "mdi-react";

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = StringsNewLeague.noName;
  } else if (!isLength(formProps.name, { min: 1, max: 40 })) {
    errors.name = StringsNewLeague.invalidName;
  }

  return errors;
}

class NewLeague extends React.Component {
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
        <h2>{StringsNewLeague.titleCreate}</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <FormFields>
            <Field
              name="name"
              type="text"
              component={RenderField}
              placeholder={StringsNewLeague.name}
              icon={<EditIcon />}
            />
          </FormFields>
          {/*
          TO DO: FILE UPLOAD FIELD FOR LEAGUE LOGO
          */}
          <p uk-margin={true}>
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
  form: "newleague",
  validate
});

export default connect(
  mapStateToProps,
  { newLeague }
)(form(NewLeague));
