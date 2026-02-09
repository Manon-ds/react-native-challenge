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

  it('returns "Unknown" when module returns empty strings', () => {
    const NativeAppVersion = jest.requireMock('../NativeAppVersion');
    NativeAppVersion.getConstants.mockReturnValue({
      appVersion: '',
      buildNumber: ''
    });

    expect(AppVersion.getFullVersion()).toBe('Unknown (Unknown)');
  });

  it('handles partial empty values', () => {
    const NativeAppVersion = jest.requireMock('../NativeAppVersion');
    NativeAppVersion.getConstants.mockReturnValue({
      appVersion: '1.0.0',
      buildNumber: ''
    });

    expect(AppVersion.getFullVersion()).toBe('1.0.0 (Unknown)');
  });
});