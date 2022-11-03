// Coloque aqui suas actions

export const USER = 'USER';
export const emailLogin = (state) => ({
  type: USER,
  state,
});

// WALLET

export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';

export const currecyRequest = () => ({
  type: CURRENCY_REQUEST,
});

export const CURRENCY_REQUEST_SUCESS = 'CURRENCY_REQUEST_SUCESS';

export const requestSucessful = (currencies) => ({
  type: CURRENCY_REQUEST_SUCESS,
  currencies,
});

export const CURRENCY_REQUEST_FAIL = 'CURRENCY_REQUEST_FAIL';
export const requestFail = (error) => ({
  type: CURRENCY_REQUEST_FAIL,
  error,
});

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(currecyRequest());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const jsonResponse = await response.json();
      const filtering = Object.keys(jsonResponse)
        .filter((elementCurrency) => elementCurrency !== 'USDT');
      dispatch(requestSucessful(filtering));
    } catch (error) {
      dispatch(requestFail(error));
    }
  };
}
