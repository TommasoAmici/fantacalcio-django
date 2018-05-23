import React from 'react';
import TelegramLoginButton from 'react-telegram-login';
import { Link, withRouter } from 'react-router-dom';



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { username, password } = this.state;
    const showPassword = this.state.showPassword;
    const isEnabled =
      username.length > 0 &&
      password.length > 0;

    return (
      <div className="uk-flex-center uk-position-center login-form" uk-grid>
        <div className="uk-align-center">
          Telegram Widget
        </div>
        <hr />
        <div className="">
          <form onSubmit id="form2" className="uk-form-stacked">

            <div className="uk-margin" uk-margin>
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
            <div className="uk-margin" uk-margin>
              <div className="uk-inline uk-width-1-1">
                <a className="uk-form-icon uk-form-icon-flip no-underline" href="#" onClick={this.handleClickShowPassword}>
                  <i className="material-icons">{showPassword ? 'visibility_off' : 'visibility'}</i>
                </a>
                <input
                  className="uk-input"
                  type={showPassword ? 'text' : 'password'}
                  field="password"
                  id="password"
                  placeholder='Password'
                  onChange={this.handleChange('password')} />
              </div>
            </div>

            <a className="" href="#">Reset password</a>
            <br />
            <p uk-margin>
              <button disabled={!isEnabled} className="uk-button uk-button-primary uk-width-1-1" type='submit'>Login</button>
              <Link className="uk-button uk-button-secondary uk-width-1-1" to="/signup">Sign up</Link>
            </p>
          </form>

        </div>
      </div >

    );
  }
}


export default withRouter(LoginForm);
