import React from 'react';
//import TelegramLoginButton from 'react-telegram-login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Radium from 'radium';
import { registerUser } from '../../actions';
import { FormFields, renderField, validateEmail, validatePassword, MaterialIcon } from './AuthFields';


function validate(formProps) {
	const errors = {};

	if (!formProps.username) {
		errors.username = 'Please enter a username';
	} else if (formProps.username.length > 15) {
		errors.username = 'Must be 15 characters or fewer'
	}

	if (!formProps.email) {
		errors.email = 'Please enter an email address';
	} else if (!validateEmail(formProps.email)) {
		errors.email = 'Enter a valid email address';
	}

	if (!formProps.password1) {
		errors.password1 = 'Please enter a password';
	} else if (!validatePassword(formProps.password1)) {
		errors.password1 = 'Must be at 8 characters long with 1 digit'
	}

	if (!formProps.password2) {
		errors.password2 = 'Please enter a password';
	} else if (!validatePassword(formProps.password2)) {
		errors.password2 = 'Must be at 8 characters long with 1 digit'
	}

	return errors;
}


export function Modal(props) {
	return (
		<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
			<h3 class="uk-card-title">{props.title}</h3>
			<p>
				{props.text}
				{props.username ? ("Username: " + props.username) : ("")}
				<br />
				{props.email ? ("Email: " + props.email) : ("")}
			</p>
		</div>
	)
}


class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			password1: "",
			password2: ""
		};
		this.handleChange = this.handleChange.bind(this);
	};

	submit = (values) => {
		this.props.registerUser(values);
	};

	handleClickShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		const { password1, password2, showPassword } = this.state;
		const errorStyle = {
			color: '#d32f2f',
		};


		return (
			<div className="uk-flex-center uk-position-center login-form" uk-grid>
				<div className="uk-align-center">
					Telegram Widget
        </div>
				<hr />
				<div className="">
					<form onSubmit={handleSubmit(this.submit)} className="uk-form-stacked">
						<FormFields>
							<Field name="username" type="text" component={renderField} placeholder="Username" icon="account_circle" />
						</FormFields>

						<FormFields>
							<Field name="email" type="text" component={renderField} placeholder="Email" icon="alternate_email" />
						</FormFields>



						<FormFields>
							<Field placeholder="Password" label="password1" name="password1" type={showPassword ? 'text' : 'password'} onChange={this.handleChange} component={renderField} />
							{(password1 === password2 && password1.length > 0) ? (
								<a
									className="uk-form-icon uk-form-icon-flip no-underline"
									onClick={this.handleClickShowPassword}>
									<i className="material-icons valid-style">check_circle</i>
								</a>
							) : (
									<a
										className="uk-form-icon uk-form-icon-flip no-underline"
										uk-tooltip={"title: At least 8 characters and 1 digit;pos:right;"}
										onClick={this.handleClickShowPassword}>
										<i
											className="material-icons"
											style={(!validatePassword(password1) && password1.length > 0) ? errorStyle : null}>{showPassword ? 'visibility_off' : 'visibility'}
										</i>
									</a>)}
						</FormFields>
						<FormFields>
							<Field placeholder="Repeat password" label="password2" name="password2" type={showPassword ? 'text' : 'password'} onChange={this.handleChange} component={renderField} />
							{(password1 === password2 && password1.length > 0) ? (
								<a
									className="uk-form-icon uk-form-icon-flip no-underline"
									onClick={this.handleClickShowPassword}>
									<i className="material-icons valid-style">check_circle
								</i>
								</a>
							) : (
									<a
										className="uk-form-icon uk-form-icon-flip no-underline"
										uk-tooltip={"title: At least 8 characters and 1 digit;pos:right;"}
										onClick={this.handleClickShowPassword}>
										<i
											className="material-icons"
											style={(!validatePassword(password2) && password2.length > 0) ? errorStyle : null}>{showPassword ? 'visibility_off' : 'visibility'}
										</i>
									</a>)}
						</FormFields>

						<Link className="" to="/reset_password">Reset password</Link>
						<br />
						<p uk-margin>
							<Link className="uk-button uk-button-secondary uk-width-1-1" to={{
								pathname: '/login',
							}}>Login</Link>
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
	form: 'signup',
	validate
});

export default connect(mapStateToProps, { registerUser })(form(SignUpForm));