import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

let params: {
  currentPage: number;
  pages: number;
  jumpToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
};

beforeEach(() => {
  params = {
    pages: 1,
    currentPage: 1,
    jumpToPage: vi.fn(),
    nextPage: vi.fn(),
    previousPage: vi.fn(),
  };
});

describe('Next and previous buttons', () => {
  test('Buttons should be disabled when there is only one page', () => {
    render(<Pagination {...params} />);

    const previousPageButton = screen.getByRole('button', {
      name: 'Página anterior',
    }) as HTMLButtonElement;
    const nextPageButton = screen.getByRole('button', {
      name: 'Próxima página',
    }) as HTMLButtonElement;

    expect(previousPageButton.disabled).toBe(true);
    expect(nextPageButton.disabled).toBe(true);
  });

  test('One button should be disabled when there is two pages', async () => {
    params.pages = 2;
    render(<Pagination {...params} />);

    const user = userEvent.setup();
    const previousPageButton = screen.getByRole('button', {
      name: 'Página anterior',
    }) as HTMLButtonElement;
    const nextPageButton = screen.getByRole('button', {
      name: 'Próxima página',
    }) as HTMLButtonElement;

    expect(previousPageButton.disabled).toBe(true);
    expect(nextPageButton.disabled).toBe(false);
    await user.click(nextPageButton);
    expect(params.nextPage).toHaveBeenCalled();
  });

  test('Buttons should be enabled when user is not on first or last page', async () => {
    params.pages = 3;
    params.currentPage = 2;
    render(<Pagination {...params} />);

    const user = userEvent.setup();
    const previousPageButton = screen.getByRole('button', {
      name: 'Página anterior',
    }) as HTMLButtonElement;
    const nextPageButton = screen.getByRole('button', {
      name: 'Próxima página',
    }) as HTMLButtonElement;

    expect(previousPageButton.disabled).toBe(false);
    expect(nextPageButton.disabled).toBe(false);
    await user.click(nextPageButton);
    expect(params.nextPage).toHaveBeenCalled();
    await user.click(previousPageButton);
    expect(params.previousPage).toHaveBeenCalled();
  });
});

describe('Page number buttons', () => {
  test('One page should have one active button', () => {
    render(<Pagination {...params} />);

    const pageNumberButtons = screen
      .getAllByRole('button')
      .slice(1, params.pages + 1) as HTMLButtonElement[];
    const buttonsClassList = pageNumberButtons.map(
      (button: HTMLButtonElement) => button.classList,
    );

    expect(pageNumberButtons).toHaveLength(1);
    expect(buttonsClassList[0]).toContain('active');
  });

  test('Multiple pages should have only one active button', () => {
    params.pages = 6;
    params.currentPage = 2;
    render(<Pagination {...params} />);

    const pageNumberButtons = screen
      .getAllByRole('button')
      .slice(1, params.pages + 1) as HTMLButtonElement[];
    const buttonsClassList = pageNumberButtons.map(
      (button: HTMLButtonElement) => button.classList,
    );

    expect(pageNumberButtons).toHaveLength(6);
    expect(buttonsClassList[1]).toContain('active');
    buttonsClassList.splice(1, 1); // Remove active button from array
    buttonsClassList.forEach((notActiveButtonClassList) => {
      expect(notActiveButtonClassList).not.toContain('active');
    });
  });
  test('Buttons should call the function with correct argument', async () => {
    params.pages = 6;
    params.currentPage = 2;

    render(<Pagination {...params} />);

    const user = userEvent.setup();
    const pageNumberButtons = screen
      .getAllByRole('button')
      .slice(1, params.pages + 1);

    await user.click(pageNumberButtons[3]);
    expect(params.jumpToPage).toHaveBeenCalledWith(4);
    await user.click(pageNumberButtons[0]);
    expect(params.jumpToPage).toHaveBeenCalledWith(1);
  });
});
