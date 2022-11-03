// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { WALLET_INFO } from '../actions';

import { CURRENCY_REQUEST, CURRENCY_REQUEST_SUCESS,
  CURRENCY_REQUEST_FAIL } from '../actions';

export const WALLET_INICIAL_STATE = {
  currencies: [],
  value: '',
  description: '',
  method: '',
  isLoading: false,
  error: '',
};

const walletReducer = (state = WALLET_INICIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case CURRENCY_REQUEST_SUCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.currencies,
    };

  case CURRENCY_REQUEST_FAIL:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default: return state;
  }
};

export default walletReducer;
