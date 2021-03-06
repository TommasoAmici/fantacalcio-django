import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FormFields, RenderField } from "../Fields";
import { isLength } from "validator/lib/isLength";
import Strings, { StringsTeams } from "../../localization/Strings";
import { EditIcon } from "mdi-react/EditIcon";
import { newTeam } from "../../actions/index";
import { resizeDataUri, getBase64 } from "../imageManipulation";

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = StringsTeams.noName;
  } else if (!isLength(formProps.name, { min: 1, max: 40 })) {
    errors.name = StringsTeams.nameLength;
  }

  return errors;
}

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
    this.onFileChange = this.onFileChange.bind(this);
  }
  submit = values => {
    values.logo = this.state.image;
    this.props.newTeam(values, this.props.history);
  };

  // get data URI from image and resize before POST
  onFileChange = e => {
    // create alias for this because I can't seem to bind it properly
    var thisAlias = this;
    const targetFile = e.target.files[0];
    if (targetFile) {
      getBase64(targetFile).then(img => {
        resizeDataUri(img, 150, 150, function(result) {
          thisAlias.setState({ image: result });
        });
      });
    }
  };

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const preview = this.state.image;
    return (
      <div className="">
        <h2>{StringsTeams.titleCreate}</h2>
        <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
          <FormFields>
            <Field
              name="name"
              type="text"
              component={RenderField}
              label={StringsTeams.name}
              icon={<EditIcon />}
              size={"1-1"}
            />
          </FormFields>

          <FormFields>
            <div className="uk-margin">
              <div className={"uk-form-custom"} uk-form-custom>
                <label className="uk-form-label">{StringsTeams.logo}</label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  value={null}
                  onChange={this.onFileChange}
                  onBlur={() => {}}
                />
                <button
                  className="uk-button uk-button-default"
                  type="button"
                  tabindex="-1"
                >
                  {Strings.selectImage}
                </button>
              </div>
            </div>
            {preview && (
              <div>
                <label className="uk-form-label">{StringsTeams.preview}</label>
                <img
                  alt={StringsTeams.previewAlt}
                  src={preview}
                  className={"logo-preview"}
                />
              </div>
            )}
          </FormFields>

          <FormFields>
            <label className="uk-form-label">{StringsTeams.history}</label>
            <Field
              name="history"
              type="text"
              component="textarea"
              placeholder={Strings.optional}
              className={"uk-textarea"}
              size={"1-1"}
            />
          </FormFields>

          <p uk-margin={true}>
            <button
              disabled={pristine || submitting || invalid}
              className="uk-button uk-button-primary uk-width-1-1"
              type="submit"
            >
              {StringsTeams.button}
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
  form: "newteam",
  validate
});

export default connect(
  mapStateToProps,
  { newTeam }
)(form(NewTeam));
