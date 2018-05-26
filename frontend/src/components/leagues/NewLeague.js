import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newLeague } from '../../actions';
import { FormFields, renderField } from '../auth/AuthFields';


function validate(formProps) {
    const errors = {};

    if (!formProps.name) {
        errors.name = 'Please enter a username';
    } else if (formProps.nam.length > 40) {
        errors.name = 'Must be 40 characters or fewer'
    }

    return errors;
}


class NewLeague extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.handleChange = this.handleChange.bind(this);
    };

    submit = (values) => {
        this.props.newLeague(values);
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        const { name, showPassword } = this.state;
        const errorStyle = {
            color: '#d32f2f',
        };


        return (
            <div className="uk-flex-center uk-position-center login-form" uk-grid>
                <div className="uk-align-center">
                    <h1>New league</h1>
                </div>
                <hr />
                <div className="">
                    <form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
                        <FormFields>
                            <Field name="name" type="text" component={renderField} placeholder="Name" icon="group" />
                        </FormFields>
                        <p uk-margin>
                            <Link className="uk-button uk-button-secondary uk-width-1-1" to={{
                                pathname: 'leagues/new',
                            }}>Join league</Link>
                            <button disabled={pristine || submitting} className="uk-button uk-button-primary uk-width-1-1" type='submit'>Sign up</button>
                        </p>
                    </form>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const form = reduxForm({
    form: 'newleague',
    validate
});

export default connect(mapStateToProps, { newLeague })(form(NewLeague));