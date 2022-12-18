import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Array } from 'prop-types';
import { removingExpenses } from '../redux/actions';
import trash from './trash.png';
import edit from './edit.png';

class Table extends Component {
  handleRemoveFunc = ({ target: { id } }) => {
    const { remove } = this.props;
    remove(id);
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <div className="allContentTable">
        <table>
          <thead>
            <tr>
              <th className="tableDeleteE">Descrição</th>
              <th className="tableDeleteE">Tag</th>
              <th className="tableDeleteE">Método de pagamento</th>
              <th className="tableDeleteE">Valor</th>
              <th className="tableDeleteE">Moeda</th>
              <th className="tableDeleteE">Câmbio utilizado</th>
              <th className="tableDeleteE">Valor convertido</th>
              <th className="tableDeleteE">Moeda de conversão</th>
              <th className="tableDeleteE">Editar/Excluir</th>

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
                    className="edit"
                  >
                    <img src={ edit } alt="edit" />

                  </button>

                  <button
                    className="trash"
                    data-testid="delete-btn"
                    type="button"
                    id={ elementExpense.id }
                    onClick={ this.handleRemoveFunc }
                  >
                    <img src={ trash } alt="tash" />

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

const mapDispatchToProps = (dispatch) => ({
  remove: (state) => dispatch(removingExpenses(state)),
});

Table.propTypes = {
  expenses: Array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
