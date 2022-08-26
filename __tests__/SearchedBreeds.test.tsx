import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchedBreeds } from '@/components/SearchedBreeds';

const queryClient = new QueryClient();

const setup = () => {
  const utils = render(
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SearchedBreeds />
    </QueryClientProvider>,
  );
  const grid = screen.getByTestId('breeds-grid');

  return {
    grid,
    ...utils,
  };
};

describe('Most searched breeds', () => {
  it('should be displayed in homepage', () => {
    const { grid } = setup();
    expect(grid).toBeInTheDocument();
  });

  it('should display 4 breeds of cats', async () => {
    setup();
    await waitFor(() => screen.getAllByTestId('searched-breed'));
    expect(screen.getAllByTestId('searched-breed')).toHaveLength(4);
  });
});
