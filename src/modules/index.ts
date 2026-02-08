import NativeAppVersion from './NativeAppVersion';

export interface AppVersionInfo {
  appVersion: string;
  buildNumber: string;
}

export const AppVersion = {
  getFullVersion: (): string => {
    const { appVersion, buildNumber } = NativeAppVersion?.getConstants() ?? {
      appVersion: 'Unknown',
      buildNumber: 'Unknown'
    };
    return `${appVersion} (${buildNumber})`;
  }
}