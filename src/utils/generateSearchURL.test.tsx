import generateSearchURL from './generateSearchURL';

test('Page 1 without search term', () => {
  const page = 1;
  const search = null;
  const url = generateSearchURL(page, search);
  expect(url).toBe('http://localhost:3333/produtos');
});

test('Page 2 without search term', () => {
  const page = 2;
  const search = null;
  const url = generateSearchURL(page, search);
  expect(url).toBe('http://localhost:3333/produtos?page=2');
});

test('Page 1 with search term', () => {
  const page = 1;
  const search = 'notnull';
  const url = generateSearchURL(page, search);
  expect(url).toBe('http://localhost:3333/produtos?search=notnull');
});

test('Page 2 with search term', () => {
  const page = 2;
  const search = 'notnull';
  const url = generateSearchURL(page, search);
  expect(url).toBe('http://localhost:3333/produtos?page=2&search=notnull');
});

test('Search term param should be lowercase', () => {
  const page = 6;
  const search = 'totallyNotNull';
  const url = generateSearchURL(page, search);
  expect(url).toBe(
    'http://localhost:3333/produtos?page=6&search=totallynotnull'
  );
});
