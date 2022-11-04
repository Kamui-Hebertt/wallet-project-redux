import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { currencyAction, setExpenses } from '../redux/actions';
import fetchCurrencyApi from '../services/api';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // exchangeRates: {},
  };

  componentDidMount() {
    const { handleFetch } = this.props;
    handleFetch();
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { add } = this.props;
    const price = await fetchCurrencyApi();
    // this.setState({
    //  exchangeRates: price,
    //  });
    add({ ...this.state, exchangeRates: price });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  toHandleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="expensiveValue">
            Valor:
            <input
              name="value"
              value={ value }
              id="expensiveValue"
              type="number"
              placeholder="valor de despesas"
              data-testid="value-input"
              onChange={ this.toHandleChange }
            />
          </label>
          <label htmlFor="expensivesDescription">
            Descrição:
            <input
              value={ description }
              onChange={ this.toHandleChange }
              name="description"
              id="expensivesDescription"
              type="text"
              placeholder="descrição da despesas"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="paymentWay">
            Método de pagamento:
            <select
              value={ method }
              name="method"
              id="paymentWay"
              data-testid="method-input"
              onChange={ this.toHandleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            <select
              value={ currency }
              id="currency"
              data-testid="currency-input"
              name="currency"
              onChange={ this.toHandleChange }
            >
              {currencies.map(((element, index) => (
                <option
                  key={ index }
                  value={ element }
                >
                  {element}

                </option>
              )))}
            </select>
          </label>
          <label htmlFor="categoryExpensives">
            Categoria
            <select
              id="category-expenses"
              data-testid="tag-input"
              onChange={ this.toHandleChange }
              name="tag"
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

        </form>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (param) => dispatch(currencyAction(param)),
  add: (state) => dispatch(setExpenses(state)),
});

WalletForm.propTypes = {
  currencies: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
