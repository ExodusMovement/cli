import {HealthCheckInterface} from '@react-native-community/cli-types';

export default {
  label: 'Android Studio',
  description: 'Required for building and installing your app on Android',
  getDiagnostics: async ({IDEs}) => {
    const needsToBeFixed = IDEs['Android Studio'] === 'Not Found';

    const missing = {
      needsToBeFixed,
      version: IDEs['Android Studio'],
    };

    return missing;
  },
  runAutomaticFix: async ({loader, logManualInstallation}) => {
    loader.fail();

    return logManualInstallation({
      healthcheck: 'Android Studio',
      url: 'https://reactnative.dev/docs/environment-setup',
    });
  },
} as HealthCheckInterface;
