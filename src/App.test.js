import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import WalletForm from './components/WalletForm';
import Login from './pages/Login';

import App from './App';
// Testando WalletForm
describe('testando botões', () => {
  beforeEach(cleanup);
  test('Testa se existe o botão de adcionar despesas', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const addExpensesBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(addExpensesBtn).toBeInTheDocument();
  });
});

// Testando component Login  e App com pathname

describe('Testando tela inicial', () => {
  test(
    'verifica se existe o elemento input email e senha dentro do componente Login',
    () => {
      renderWithRouterAndRedux(<Login />);
      // const validEmail = 'example123@gmail.com';
      // const validPassword = '1234567';
      const elementInput = screen.getByTestId('email-input');
      const elementPassword = screen.getByTestId('password-input');
      const enterBtn = screen.getByRole('button', { name: /Entrar/i });
      expect(elementInput).toBeInTheDocument();
      expect(elementPassword).toBeInTheDocument();
      expect(enterBtn).toBeInTheDocument();
    },
  );
  test('testa se ao preencher corretamente e clicar no respectivo botão ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const validEmail = 'example123@gmail.com';
    const ValidPassword = '1234567';
    const elementInput = screen.getByTestId('email-input');
    const elementPassword = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: /Entrar/i });
    expect(enterBtn).toBeDisabled();
    userEvent.type(elementInput, validEmail);
    userEvent.type(elementPassword, ValidPassword);

    expect(enterBtn).not.toBeDisabled();
    userEvent.click(enterBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
