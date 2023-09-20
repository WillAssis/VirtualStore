import QuantityInput from './QuantityInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

let params: {
  quantity: number;
  changeQuantity: () => void;
};

beforeEach(() => {
  params = {
    quantity: 3,
    changeQuantity: jest.fn(),
  };
});

describe('Render input value', () => {
  test('Default value should be 1, if no quantity parameter', () => {
    render(<QuantityInput changeQuantity={params.changeQuantity} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(1);
  });

  test('Value equals to quantity parameter', () => {
    render(<QuantityInput {...params} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(3);
  });
});

describe('Custom buttons', () => {
  test('Increase button add 1 on input value', () => {
    render(<QuantityInput {...params} />);

    const input = screen.getByRole('spinbutton');
    const button = screen.getByRole('button', { name: 'Aumentar' });

    userEvent.click(button);
    expect(input).toHaveValue(4);
    expect(params.changeQuantity).toHaveBeenCalledWith(4);
  });

  test('Decrease button remove 1 from input value', () => {
    render(<QuantityInput {...params} />);

    const input = screen.getByRole('spinbutton');
    const button = screen.getByRole('button', { name: 'Diminuir' });

    userEvent.click(button);
    expect(input).toHaveValue(2);
    expect(params.changeQuantity).toHaveBeenCalledWith(2);
  });

  test('Input value should not go below 1', () => {
    params.quantity = 1;
    render(<QuantityInput {...params} />);

    const input = screen.getByRole('spinbutton');
    const button = screen.getByRole('button', {
      name: 'Diminuir',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    userEvent.click(button);
    expect(input).toHaveValue(1);
    expect(params.changeQuantity).not.toHaveBeenCalled();
  });
});

describe('Input default functionality', () => {
  test('User typing directly on input', () => {
    render(<QuantityInput {...params} />);
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, '1');
    expect(params.changeQuantity).toHaveBeenCalledWith(31);
  });
});
