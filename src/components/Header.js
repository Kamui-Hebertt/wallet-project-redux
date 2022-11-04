import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, array } from 'prop-types';

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
      <div>
        Header
        <div data-testid="email-field">
          {email}
        </div>
        <div data-testid="total-field">
          {totalExpensives.toFixed(2) || (0)}
        </div>
        <div data-testid="header-currency-field">
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
