import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

test('Search bar correctly calls given function', async () => {
  const searchFunc = vi.fn((event) => event.preventDefault());
  const user = userEvent.setup();

  render(<SearchBar search={searchFunc} />);
  const input = screen.getByRole('searchbox');
  const button = screen.getByRole('button');

  input.focus();
  await user.keyboard('test');
  await user.click(button);

  expect(searchFunc).toHaveBeenCalled();
});
