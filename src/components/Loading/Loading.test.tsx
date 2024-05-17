import { render, screen } from '@testing-library/react';
import Loading from './Loading';

const buildProps = (loading: boolean, error: string) => {
  return {
    loading: loading,
    error: error,
    children: <h1>content</h1>,
  };
};

describe('Should render loading screen when', () => {
  test('content is loading', () => {
    const props = buildProps(true, '');

    render(<Loading {...props} />);
    const loadingSpinner = screen.getByRole('alert', { name: 'Loading' });
    const content = screen.queryByRole('heading', { name: 'content' });

    expect(loadingSpinner).toBeInTheDocument();
    expect(content).toBeNull();
  });

  test('content is loading with error', () => {
    const props = buildProps(true, 'Im an error');

    render(<Loading {...props} />);
    const loadingSpinner = screen.getByRole('alert', { name: 'Loading' });
    const error = screen.getByText('Im an error');
    const content = screen.queryByRole('heading', { name: 'content' });

    expect(loadingSpinner).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(content).toBeNull();
  });

  test('content finished loading with error', () => {
    const props = buildProps(false, 'Im another error');

    render(<Loading {...props} />);
    const loadingSpinner = screen.getByRole('alert', { name: 'Loading' });
    const error = screen.getByText('Im another error');
    const content = screen.queryByRole('heading', { name: 'content' });

    expect(loadingSpinner).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(content).toBeNull();
  });
});

describe('Should render content when', () => {
  test('content finished loading without error', () => {
    const props = buildProps(false, '');

    render(<Loading {...props} />);
    const loadingSpinner = screen.queryByRole('alert', { name: 'Loading' });
    const content = screen.getByRole('heading', { name: 'content' });

    expect(loadingSpinner).toBeNull();
    expect(content).toBeInTheDocument();
  });
});
