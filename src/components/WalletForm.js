/* eslint-disable react/jsx-max-depth */
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
      <div className="walletBtns">

        <form>
          <label htmlFor="expensiveValue">
            <div className="input1">
              <p> Valor:</p>
              <input
                name="value"
                value={ value }
                id="expensiveValue"
                type="number"
                placeholder="valor de despesas"
                data-testid="value-input"
                onChange={ this.toHandleChange }
              />
            </div>
          </label>
          <label htmlFor="expensivesDescription">
            <div className="input2">
              <p> Descrição:</p>
              <input
                value={ description }
                onChange={ this.toHandleChange }
                name="description"
                id="expensivesDescription"
                type="text"
                placeholder="descrição da despesas"
                data-testid="description-input"
              />
            </div>

          </label>
          <label htmlFor="paymentWay">
            <div className="select1">
              <p>Método de pagamento:</p>
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
            </div>
          </label>
          <label htmlFor="currency">
            <div className="select2">
              Moeda:
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
            </div>
          </label>
          <label htmlFor="categoryExpensives">
            <div className="select3">
              Categoria:
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
            </div>
          </label>

        </form>
        <div className="btn">
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
        </div>
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
