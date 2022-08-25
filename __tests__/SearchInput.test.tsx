import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SearchInput } from '@/components/SearchInput';

const queryClient = new QueryClient();

const setup = () => {
  const utils = render(
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SearchInput />
    </QueryClientProvider>,
  );
  const input = screen.getByPlaceholderText('Search');
  const list = screen.queryByTestId('search-list');

  return {
    input,
    list,
    ...utils,
  };
};

describe('Search Breeds Input', () => {
  it('should be displayed in homepage', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('should display search list if input has value', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'british' } });
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();
  });

  it('should hide search list if user clicks outside of component', () => {
    const { input, list } = setup();
    fireEvent.change(input, { target: { value: 'british' } });
    fireEvent.click(document.body);
    expect(list).toBeFalsy();
  });

  it('should fetch breeds list on input change', async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'siamese' } });
    await waitFor(() => screen.getByText('Siamese'), {
      timeout: 1100,
    });
    expect(screen.getByText('Siamese')).toBeInTheDocument();
  });

  it('should display error message in list if cat breed is not found', async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'somecatbreed' } });
    await waitFor(() => screen.getByText('No breeds found 😿'));
    expect(screen.getByText('No breeds found 😿')).toBeInTheDocument();
  });
});
