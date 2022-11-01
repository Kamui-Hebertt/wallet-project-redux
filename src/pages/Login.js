import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

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

  // submitBtn = (e) => {
  //  e.preventDefault();
  //  const { email } = this.state;
  //   const { dispatch, history } = this.props;
  //   dispatch(emailLogin({ email }));
  //   const { push } = history;
  //   push('/carteira');
  // };

  render() {
    const { history, user } = this.props;
    const { password, email, locked } = this.state;
    return (
      <div>
        <label htmlFor="emailinput">
          Email:
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="email-input"
            id="email-input"
            onChange={ this.handleChanger }
          />
        </label>
        <label htmlFor="passwordinput">
          Senha:
          <input
            value={ password }
            name="password"
            type="password"
            data-testid="password-input"
            id="passwordinput"
            onChange={ this.handleChanger }

          />
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
