import changePageTheme from './changePageTheme';

test('Change page theme from light to dark', () => {
  const root = document.documentElement;
  root.className = 'light';
  changePageTheme();
  expect(root.className).toBe('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
});

test('Change page theme from dark to light', () => {
  const root = document.documentElement;
  root.className = 'dark';
  changePageTheme();
  expect(root.className).toBe('light');
  expect(localStorage.getItem('theme')).toBe('light');
});
