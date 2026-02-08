import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    appVersion: string;
    buildNumber: string;
  };
}

export default TurboModuleRegistry.get<Spec>('AppVersionModule');