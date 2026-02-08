import { AppVersion } from '../index';

jest.mock('../NativeAppVersion', () => ({
  getConstants: jest.fn(() => ({
    appVersion: '1.0.0',
    buildNumber: '42'
  }))
}));

describe('AppVersion', () => {
  it('returns version', () => {
    expect(AppVersion.getFullVersion()).toBe('1.0.0 (42)');
  });


  it('returns "Unknown" when no version', () => {
    const NativeAppVersion = jest.requireMock('../NativeAppVersion');
    NativeAppVersion.getConstants.mockReturnValue(null);

    expect(AppVersion.getFullVersion()).toBe('Unknown (Unknown)');
  });
});