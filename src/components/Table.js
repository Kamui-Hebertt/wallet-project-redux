import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Array } from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>

            </tr>
          </thead>
          <tbody>
            {expenses.map((elementExpense) => (
              <tr key={ elementExpense.id }>
                <td>{elementExpense.description}</td>
                <td>{elementExpense.tag}</td>

                <td>{elementExpense.method}</td>
                <td>{elementExpense.exchangeRates[elementExpense.currency].name}</td>
                <td>{Number(elementExpense.value).toFixed(2)}</td>
                <td>
                  {Number(elementExpense.exchangeRates[elementExpense.currency].ask)
                    .toFixed(2)}

                </td>
                <td>
                  {
                    Number(elementExpense.value
                      * elementExpense.exchangeRates[elementExpense.currency].ask)
                      .toFixed(2)
                  }

                </td>
                <td>BRL</td>
                <td>
                  <button
                    type="button"
                    id={ elementExpense.id }
                  >
                    Excluir

                  </button>
                  <button
                    type="button"
                    id={ elementExpense.id }
                  >
                    Editar

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: Array,
}.isRequired;

export default connect(mapStateToProps)(Table);
