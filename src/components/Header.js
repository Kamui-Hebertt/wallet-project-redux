import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    this.state = {
      totalExpensives: 0,
    };

    const { email } = this.props;
    const { totalExpensives } = this.state;

    return (
      <div>
        Header
        <div data-testid="email-field">
          {email}
        </div>
        <div data-testid="total-field">
          {totalExpensives}
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
