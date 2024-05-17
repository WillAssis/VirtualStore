import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

interface Props {
  pages: number;
  currentPage: number;
  jump: (page: number) => void;
}

const setup = (props: Props) => {
  const user = userEvent.setup();
  render(<Pagination {...props} />);
  return { user };
};

describe('Next and previous buttons behaviour', () => {
  test('When there is one page', async () => {
    setup({ pages: 1, currentPage: 1, jump: vi.fn() });

    const previous = screen.getByRole('button', {
      name: 'Anterior',
    }) as HTMLButtonElement;
    const next = screen.getByRole('button', {
      name: 'Próxima',
    }) as HTMLButtonElement;

    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(true);
  });

  test('When there is two pages', async () => {
    const jump = vi.fn();
    const { user } = setup({ pages: 2, currentPage: 1, jump });

    const previous = screen.getByRole('button', {
      name: 'Anterior',
    }) as HTMLButtonElement;
    const next = screen.getByRole('button', {
      name: 'Próxima',
    }) as HTMLButtonElement;

    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);
    await user.click(next);
    expect(jump).toHaveBeenCalledWith(2);
  });

  test('When there is three or more pages', async () => {
    const jump = vi.fn();
    const { user } = setup({ pages: 3, currentPage: 2, jump });

    const previous = screen.getByRole('button', {
      name: 'Anterior',
    }) as HTMLButtonElement;
    const next = screen.getByRole('button', {
      name: 'Próxima',
    }) as HTMLButtonElement;

    expect(previous.disabled).toBe(false);
    expect(next.disabled).toBe(false);
    await user.click(next);
    expect(jump).toHaveBeenCalledWith(3);
    await user.click(previous);
    expect(jump).toHaveBeenCalledWith(1);
  });
});

describe('Page number buttons behaviour', () => {
  test('When there is one page', async () => {
    setup({ pages: 1, currentPage: 1, jump: vi.fn() });

    const buttons = screen.getAllByRole('button', {
      name: /^[0-9]*$/,
    });

    expect(buttons).toHaveLength(1);
  });

  test('When there more than one page', async () => {
    const jump = vi.fn();
    const { user } = setup({ pages: 6, currentPage: 2, jump });

    const buttons = screen.getAllByRole('button', {
      name: /^[0-9]*$/,
    });
    const totallyRandomButton = buttons[4];

    await user.click(totallyRandomButton);

    expect(buttons).toHaveLength(6);
    expect(jump).toHaveBeenCalledWith(5);
  });
});
