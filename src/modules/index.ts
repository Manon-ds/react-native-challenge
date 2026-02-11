import NativeAppVersion from './NativeAppVersion';

export const AppVersion = {
  getFullVersion: (): string => {
    const constants = NativeAppVersion?.getConstants();
    const appVersion = constants?.appVersion || 'Unknown';
    const buildNumber = constants?.buildNumber || 'Unknown';
    return `${appVersion} (${buildNumber})`;
  }
}
