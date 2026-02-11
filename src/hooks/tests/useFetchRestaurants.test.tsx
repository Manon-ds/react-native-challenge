import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchRestaurants } from '../useFetchRestaurants';
import { mockFetchSuccess, mockFetchFailure } from '../../testUtils/mockFetch';
import { mockRestaurantList } from '../../testUtils/mockRestaurantData';
import { RestaurantList } from '../../types/Restaurant';

const TEST_URL = 'https://fakeAPI.com/restaurants.json';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFetchRestaurants', () => {
  it('fetches data and sets restaurants on success', async () => {
    mockFetchSuccess(mockRestaurantList);
    const { result } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual(mockRestaurantList);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      TEST_URL,
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('sets loading to true while fetching', async () => {
    let resolveFetch: (value: unknown) => void;
    globalThis.fetch = jest.fn(
      () =>
        new Promise(resolve => {
          resolveFetch = resolve;
        }),
    ) as jest.Mock;

    const { result } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    resolveFetch!({
      ok: true,
      json: () => Promise.resolve(mockRestaurantList),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('sets error on returned error', async () => {
    mockFetchFailure('No results found');
    const { result } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    await waitFor(() => {
      expect(result.current.error).toBe('No results found');
    });

    expect(result.current.restaurants).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});

describe('useFetchRestaurants - timeout behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sets timeout error when request exceeds 30 seconds', async () => {
    globalThis.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    const { result } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('');

    jest.advanceTimersByTime(30000);

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Request timed out - please check your connection',
      );
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.restaurants).toBeNull();
  });

  it('clears timeout when fetch completes before timeout', async () => {
    jest.useRealTimers();
    mockFetchSuccess(mockRestaurantList);

    const { result } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual(mockRestaurantList);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('silently handles abort on unmount', async () => {
    jest.useRealTimers();
    globalThis.fetch = jest.fn(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve(mockRestaurantList),
            });
          }, 1000);
        }),
    ) as jest.Mock;

    const { result, unmount } = renderHook(() =>
      useFetchRestaurants<RestaurantList>(TEST_URL),
    );

    expect(result.current.loading).toBe(true);
    unmount();

    await new Promise<void>(resolve => setTimeout(resolve, 100));
    expect(result.current.error).toBe('');
  });
});
