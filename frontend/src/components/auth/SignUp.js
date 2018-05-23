import React from 'react';
import classNames from 'classnames';
import TelegramLoginButton from 'react-telegram-login';
import { Link } from 'react-router-dom';

function Modal(props) {
	return (
		<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
			<h3 class="uk-card-title">Thanks for signing up</h3>
			<p>
				Username: {props.username}
				<br />
				Email: {props.email}
			</p>
		</div>
	)
}

// very basic validation of email and password
function validateEmail(email) {
	return email.indexOf('@') !== -1 > 0 && email.indexOf('.') !== -1
};

function validatePassword(password) {
	return password.length > 8 && /\d/.test(password)
}

function validate(email, password1, password2) {
	return {
		email: validateEmail(email),
		password1: validatePassword(password1),
		password2: validatePassword(password2),
		passwordsAreEqual: password1.length > 0 && password1 === password2
	};
}


class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password1: "",
			password2: "",
			showPassword: false,
			touched: {
				email: false,
				password: false,
				password2: false
			},
			response: {
				token: "",
				user: {
					username: "",
					email: ""
				}
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = prop => event => {
		this.setState({
			[prop]: event.target.value,
		});
	};

	handleSubmit() {
		var body = {
			"username": this.state.username,
			"email": this.state.email,
			"password1": this.state.password1,
			"password2": this.state.password2,
		};
		fetch('/register/', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(body),
			redirect: 'error'
		}).then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({
					response: json,
				});
			});
	}

	handleClickShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	handleBlur = (field) => (evt) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true },
		});
	}

	render() {
		const { classes } = this.props;
		const showPassword = this.state.showPassword;
		const { username, email, password1, password2, touched, response } = this.state;
		const errors = validate(email, password1, password2);
		const isEnabled =
			email.length > 0 &&
			username.length > 0 &&
			password1.length > 0 &&
			password1 === password2;

		var checkStyle = {
			color: '#4CAF50',
		};

		return (
			<div className="uk-flex-center uk-position-center login-form" uk-grid="true">
				{response.user.username.length > 0 ? (<Modal username={response.user.username} email={response.user.email} />) : (
					<div>
						<div className="uk-align-center">
							Telegram Widget
        </div>
						<hr />
						<div className="">
							<form onSubmit={this.handleSubmit} id="form2" className="uk-form-stacked">
								<div className="uk-margin" uk-margin="true">
									<div className="uk-inline uk-width-1-1">
										<span className="uk-form-icon uk-form-icon-flip">
											<i className="material-icons">account_circle</i>
										</span>
										<input
											defaultValue={username}
											onChange={this.handleChange('username')}
											className="uk-input"
											field="username"
											id="username"
											placeholder='Username' />
									</div>
								</div>
								<div className="uk-margin" uk-margin="true">
									<div className="uk-inline uk-width-1-1">
										<span className="uk-form-icon uk-form-icon-flip">
											<i className="material-icons">alternate_email</i>
										</span>
										<input
											defaultValue={email}
											onChange={this.handleChange('email')}
											onBlur={this.handleBlur('email')}
											className={touched.email ? (errors.email ? 'uk-input' : 'uk-input error') : ('uk-input')}
											field="email"
											id="email"
											placeholder='Email' />
									</div>
								</div>
								<div className="uk-margin" uk-margin="true">
									<div className="uk-inline uk-width-1-1">
										{!errors.passwordsAreEqual && <a className="uk-form-icon uk-form-icon-flip no-underline" href="#" onClick={this.handleClickShowPassword}>
											<i className="material-icons">{showPassword ? 'visibility_off' : 'visibility'}</i>
										</a>}
										{errors.passwordsAreEqual && <a className="uk-form-icon uk-form-icon-flip no-underline" href="#" onClick={this.handleClickShowPassword}>
											<i className="material-icons" style={checkStyle}>check_circle</i>
										</a>}
										<input
											className={touched.password1 ? (errors.password1 ? 'uk-input' : 'uk-input error') : ('uk-input')}
											type={showPassword ? 'text' : 'password'}
											field="password1"
											id="password1"
											placeholder='Password'
											onBlur={this.handleBlur('password1')}
											onChange={this.handleChange('password1')} />
									</div>
								</div>
								<div className="uk-margin" uk-margin="true">
									<div className="uk-inline uk-width-1-1">
										{!errors.passwordsAreEqual && <a className="uk-form-icon uk-form-icon-flip no-underline" href="#" onClick={this.handleClickShowPassword}>
											<i className="material-icons">{showPassword ? 'visibility_off' : 'visibility'}</i>
										</a>}
										{errors.passwordsAreEqual && <a className="uk-form-icon uk-form-icon-flip no-underline" href="#" onClick={this.handleClickShowPassword}>
											<i className="material-icons" style={checkStyle}>check_circle</i>
										</a>}
										<input
											className={touched.password2 ? (errors.password2 ? 'uk-input' : 'uk-input error') : ('uk-input')}
											type={showPassword ? 'text' : 'password'}
											field="password2"
											id="password2"
											placeholder='Repeat password'
											onBlur={this.handleBlur('password2')}
											onChange={this.handleChange('password2')} />
									</div>
								</div>
								<a className="" href="#">Reset password</a>
								<br />
								<p uk-margin>
									<Link className="uk-button uk-button-secondary uk-width-1-1" to={{
										pathname: '/login',
										state: {}
									}}>Login</Link>
									<button disabled={!isEnabled} className="uk-button uk-button-primary uk-width-1-1" type='submit'>Sign up</button>
								</p>
							</form>

						</div>
					</div>)}
			</div >

		);
	}
}


export default SignUpForm;
