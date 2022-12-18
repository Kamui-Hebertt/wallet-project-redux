import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, array } from 'prop-types';
import logo from '../logo.png';
import coins from './coins.png';
import profile from './profile.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpensives = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      console.log(exchangeRates);
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);

    return (
      <div className="headerAll">
        <img src={ logo } alt="alt" className="logoimg" />
        <div data-testid="email-field" className="profile">
          <img src={ profile } alt="profile" />
          <p>{email}</p>
        </div>
        <div data-testid="total-field" className="expenses">
          <img src={ coins } alt="coins" />
          <p>Total de despesas:</p>
          {' '}
          <p className="number">
            {' '}
            {totalExpensives.toFixed(2) || (0)}
          </p>
        </div>
        <div data-testid="header-currency-field" className="br">
          <p>BRL</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  expenses: array,
}.isRequired;
export default connect(mapStateToProps)(Header);
