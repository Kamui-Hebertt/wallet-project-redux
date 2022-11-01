// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions';

const INICIAL_STATE = {
  user: {},
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      email: action.state.email,
    };

  default: return state;
  }
};

export default user;
