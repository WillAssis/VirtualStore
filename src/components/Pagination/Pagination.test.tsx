import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('One page - both next and previous button disabled', () => {
  const params = {
    pages: 1,
    currentPage: 1,
    jumpToPage: jest.fn(),
    nextPage: jest.fn(),
    previousPage: jest.fn(),
  };

  render(<Pagination {...params} />);

  const previousPageButton = screen.getByRole('button', {
    name: 'Página anterior',
  }) as HTMLButtonElement;
  const nextPageButton = screen.getByRole('button', {
    name: 'Próxima página',
  }) as HTMLButtonElement;
  const pageNumberButtons = screen
    .getAllByRole('button')
    .slice(1, params.pages + 1);

  expect(previousPageButton.disabled).toBe(true);
  expect(nextPageButton.disabled).toBe(true);
  expect(pageNumberButtons).toHaveLength(1);
});

test('Two pages - one of next or previous button disabled', () => {
  const params = {
    pages: 2,
    currentPage: 1,
    jumpToPage: jest.fn(),
    nextPage: jest.fn(),
    previousPage: jest.fn(),
  };

  render(<Pagination {...params} />);

  const previousPageButton = screen.getByRole('button', {
    name: 'Página anterior',
  }) as HTMLButtonElement;
  const nextPageButton = screen.getByRole('button', {
    name: 'Próxima página',
  }) as HTMLButtonElement;
  const pageNumberButtons = screen
    .getAllByRole('button')
    .slice(1, params.pages + 1);

  expect(previousPageButton.disabled).toBe(true);
  expect(nextPageButton.disabled).toBe(false);
  expect(pageNumberButtons).toHaveLength(2);

  userEvent.click(nextPageButton);

  expect(params.nextPage).toHaveBeenCalled();
});

test('Three pages - Both next and previous enabled on middle page', () => {
  const params = {
    pages: 3,
    currentPage: 2,
    jumpToPage: jest.fn(),
    nextPage: jest.fn(),
    previousPage: jest.fn(),
  };

  render(<Pagination {...params} />);

  const previousPageButton = screen.getByRole('button', {
    name: 'Página anterior',
  }) as HTMLButtonElement;
  const nextPageButton = screen.getByRole('button', {
    name: 'Próxima página',
  }) as HTMLButtonElement;
  const pageNumberButtons = screen
    .getAllByRole('button')
    .slice(1, params.pages + 1);

  expect(previousPageButton.disabled).toBe(false);
  expect(nextPageButton.disabled).toBe(false);
  expect(pageNumberButtons).toHaveLength(3);
});

test('Page number buttons', () => {
  const params = {
    pages: 6,
    currentPage: 2,
    jumpToPage: jest.fn(),
    nextPage: jest.fn(),
    previousPage: jest.fn(),
  };

  render(<Pagination {...params} />);

  const pageNumberButtons = screen
    .getAllByRole('button')
    .slice(1, params.pages + 1);

  expect(pageNumberButtons).toHaveLength(6);

  userEvent.click(pageNumberButtons[3]);

  expect(params.jumpToPage).toHaveBeenCalledWith(4);
});
