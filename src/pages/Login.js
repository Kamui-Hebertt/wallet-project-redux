import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logo.png';

import { emailLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      locked: true,
    };
    this.handleChanger = this.handleChanger.bind(this);
  }

  handleChanger(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value }, this.toValidateFields);
  }

  toValidateFields = () => {
    const { password, email } = this.state;

    const six = 6;
    const regexEmail = /^\S+@\S+\.\S+$/;
    if (password.length >= six && email.match(regexEmail)) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  };

  render() {
    const { history, user } = this.props;
    const { password, email, locked } = this.state;
    return (
      <div className="allLoginContent">
        <div className="form">
          <img src={ logo } className="logo" alt="logo" />
          <label htmlFor="emailinput">
            <div className="theEmail">
              <p> Email:</p>
              <input
                className="firstInput"
                value={ email }
                name="email"
                type="email"
                placeholder="Email"
                data-testid="email-input"
                id="email-input"
                onChange={ this.handleChanger }
              />
            </div>
          </label>
          <label htmlFor="passwordinput">
            <div className="thePass">
              <p>Senha:</p>
              <input
                value={ password }
                name="password"
                placeholder="Password"
                type="password"
                data-testid="password-input"
                id="passwordinput"
                onChange={ this.handleChanger }

              />
            </div>
          </label>
          <button
            type="button"
            onClick={ () => {
              history.push('/carteira');
              user(this.state);
            } }
            disabled={ locked }
          >
            Entrar
            {' '}

          </button>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(emailLogin(state)),
});

Login.propTypes = {
  user: func,

}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
