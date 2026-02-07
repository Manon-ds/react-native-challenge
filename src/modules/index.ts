import NativeAppVersion from './NativeAppVersion';

export interface AppVersionInfo {
  appVersion: string;
  buildNumber: string;
}

export const AppVersion = {
  getVersion: (): string => {
    return NativeAppVersion?.getConstants().appVersion ?? 'Unknown';
  },
  getBuildNumber: (): string => {
    return NativeAppVersion?.getConstants().buildNumber ?? 'Unknown';
  },
  getFullVersion: (): string => {
    const { appVersion, buildNumber } = NativeAppVersion?.getConstants() ?? {
      appVersion: 'Unknown',
      buildNumber: 'Unknown'
    };
    return `${appVersion} (${buildNumber})`;
  }
}