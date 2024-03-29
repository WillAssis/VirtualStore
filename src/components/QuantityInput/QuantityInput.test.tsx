import QuantityInput from './QuantityInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

let params: {
  quantity: number;
  setQuantity: () => void;
};

beforeEach(() => {
  params = {
    quantity: 3,
    setQuantity: vi.fn(),
  };
});

describe('Custom buttons', () => {
  test('Increase button calls function with correct value', async () => {
    render(<QuantityInput {...params} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Aumentar' });

    await user.click(button);
    expect(params.setQuantity).toHaveBeenCalledWith(4);
  });

  test('Decrease button calls function with correct value', async () => {
    render(<QuantityInput {...params} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Diminuir' });

    await user.click(button);

    expect(params.setQuantity).toHaveBeenCalledWith(2);
  });

  test('Decrease button should not call function when quantity is 1', async () => {
    params.quantity = 1;
    render(<QuantityInput {...params} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', {
      name: 'Diminuir',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    await user.click(button);
    expect(params.setQuantity).not.toHaveBeenCalled();
  });
});

describe('Input default functionality', () => {
  test('Input changing should call function with correct value', async () => {
    render(<QuantityInput {...params} />);

    const user = userEvent.setup();
    const input = screen.getByRole('spinbutton');

    await user.type(input, '1');
    expect(params.setQuantity).toHaveBeenCalledWith(31);
  });
});
