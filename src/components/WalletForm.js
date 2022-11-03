import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      // currencies: [],
    };
    this.toHandleChange = this.toHandleChange.bind(this);
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  toHandleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const CategoryExpensives = ['Alimentação', 'Lazer',
      'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="expensiveValue">
            Valor:
            <input
              id="expensiveValue"
              type="number"
              placeholder="valor de despesas"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="expensivesDescription">
            Descrição:
            <input
              id="expensivesDescription"
              type="text"
              placeholder="descrição da despesas"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="paymentWay">
            Método de pagamento:
            <select id="paymentWay" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            <select
              id="currency"
              data-testid="currency-input"
              name="currencies"
            >
              {currencies.map(((element, index) => (
                <option
                  key={ index }
                  value={ element }
                  name={ element }
                  onChange={ this.toHandleChange }
                >
                  {element}

                </option>
              )))}
            </select>
          </label>
          <label htmlFor="categoryExpensives">
            <select id="categoryExpensives" data-testid="tag-input">
              {CategoryExpensives.map((elementCategory, index) => (
                <option
                  key={ index }
                >
                  {elementCategory}
                </option>
              ))}
            </select>
          </label>

        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
