import loadPageTheme from './loadPageTheme';

const setSystemColor = (color: String) => {
  window.matchMedia = (query) => ({
    media: query,
    matches: query === `(prefers-color-scheme: ${color})`,
    onchange: () => {},
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
};

test('System theme is light', () => {
  const root = document.documentElement;
  setSystemColor('light');
  loadPageTheme();
  expect(root.className).toBe('light');
});

test('System theme is dark', () => {
  const root = document.documentElement;
  setSystemColor('dark');
  loadPageTheme();
  expect(root.className).toBe('dark');
});

test('System is light and user had light theme before', () => {
  const root = document.documentElement;
  window.localStorage.setItem('theme', 'light');
  setSystemColor('light');
  loadPageTheme();
  expect(root.className).toBe('light');
});

test('System is dark and user had dark theme before', () => {
  const root = document.documentElement;
  window.localStorage.setItem('theme', 'dark');
  setSystemColor('dark');
  loadPageTheme();
  expect(root.className).toBe('dark');
});

test('System is light but user had dark theme before', () => {
  const root = document.documentElement;
  window.localStorage.setItem('theme', 'dark');
  setSystemColor('light');
  loadPageTheme();
  expect(root.className).toBe('dark');
});

test('System is dark but user had light theme before', () => {
  const root = document.documentElement;
  window.localStorage.setItem('theme', 'light');
  setSystemColor('dark');
  loadPageTheme();
  expect(root.className).toBe('light');
});
