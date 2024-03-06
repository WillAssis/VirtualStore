import Header from './Header';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('Display correct navigation when user is logged out', () => {
  render(<Header user={null} logout={() => {}} />, {
    wrapper: MemoryRouter,
  });

  const loginButton = screen.queryByRole('link', { name: 'Login' });
  const registerButton = screen.queryByRole('link', { name: 'Cadastro' });
  const adminLink = screen.queryByRole('link', { name: 'Admin' });
  const accountSettings = screen.queryByRole('button', {
    name: 'Abrir configurações de usuário',
  });

  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
  expect(adminLink).toBeNull();
  expect(accountSettings).toBeNull();
});

test('Display correct navigation when user is logged in', () => {
  const user = { username: 'UsErNaMe', isAdmin: false };

  render(<Header user={user} logout={() => {}} />, {
    wrapper: MemoryRouter,
  });

  const loginButton = screen.queryByRole('link', { name: 'Login' });
  const registerButton = screen.queryByRole('link', { name: 'Cadastro' });
  const adminLink = screen.queryByRole('link', { name: 'Admin' });
  const accountSettings = screen.queryByRole('button', {
    name: 'Abrir configurações de usuário',
  });

  expect(loginButton).toBeNull();
  expect(registerButton).toBeNull();
  expect(adminLink).toBeNull();
  expect(accountSettings).toBeInTheDocument();
});

test('Display correct navigation when user is admin', () => {
  const user = { username: 'ImAdmin', isAdmin: true };

  render(<Header user={user} logout={() => {}} />, {
    wrapper: MemoryRouter,
  });

  const loginButton = screen.queryByRole('link', { name: 'Login' });
  const registerButton = screen.queryByRole('link', { name: 'Cadastro' });
  const adminLink = screen.queryByRole('link', { name: 'Admin' });
  const accountSettings = screen.queryByRole('button', {
    name: 'Abrir configurações de usuário',
  });

  expect(loginButton).toBeNull();
  expect(registerButton).toBeNull();
  expect(adminLink).toBeInTheDocument();
  expect(accountSettings).toBeInTheDocument();
});

test('Allows user to logout', async () => {
  const user = userEvent.setup();
  const userInfo = { username: 'User555', isAdmin: false };
  const logout = vi.fn();

  render(<Header user={userInfo} logout={logout} />, {
    wrapper: MemoryRouter,
  });

  const logoutButton = screen.getByRole('button', { name: 'Sair' });
  await user.click(logoutButton);

  expect(logout).toHaveBeenCalled();
});
