export function mockFetchSuccess(data: unknown): void {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    } as Response),
  );
}

export function mockFetchFailure(errorMessage: string): void {
  globalThis.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));
}
