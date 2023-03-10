// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { WALLET_INFO } from '../actions';

import {
  CURRENCY_REQUEST,
  ADD_EXPENSES,
  REQUEST_CURRENCY,
  REMOVE_EXPENSES,
}
  from '../actions';

export const WALLET_INICIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  error: '',
};

const walletReducer = (state = WALLET_INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY: return {
    ...state,
  };
  case CURRENCY_REQUEST:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((coin) => coin !== 'USDT'),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((elementExpense) => elementExpense.currency !== ''),
      { id: state.expenses.length, ...action.expenses }],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((elementExpense) => elementExpense.id // retorna false
         !== Number(action.removing))],
    };
  default: return state;
  }
};

export default walletReducer;
