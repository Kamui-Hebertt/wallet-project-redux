import fetchCurrencyApi from '../../services/api';

export const USER = 'USER';
export const emailLogin = (state) => ({
  type: USER,
  state,
});

// WALLET

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const removingExpenses = (removing) => ({
  type: REMOVE_EXPENSES,
  removing,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const currencyRequest = (currencies) => ({
  type: CURRENCY_REQUEST,
  currencies,
});

export const setExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const CURRENCY_REQUEST_FAIL = 'CURRENCY_REQUEST_FAIL';
export const requestFail = (error) => ({
  type: CURRENCY_REQUEST_FAIL,
  error,
});

export const currencyAction = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetchCurrencyApi();
    dispatch(currencyRequest(response));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
