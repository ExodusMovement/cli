import versionRanges from '../versionRanges';
import {doesSoftwareNeedToBeFixed} from '../checkInstallation';
import {HealthCheckInterface} from '@react-native-community/cli-types';

export default {
  label: 'JDK',
  getDiagnostics: async ({Languages}) => ({
    needsToBeFixed: doesSoftwareNeedToBeFixed({
      version:
        typeof Languages.Java === 'string'
          ? Languages.Java
          : Languages.Java.version,
      versionRange: versionRanges.JAVA,
    }),

    version:
      typeof Languages.Java === 'string'
        ? Languages.Java
        : Languages.Java.version,
    versionRange: versionRanges.JAVA,
  }),
  runAutomaticFix: async ({logManualInstallation, loader}) => {
    loader.fail();
    logManualInstallation({
      healthcheck: 'JDK',
      url: 'https://openjdk.java.net/',
    });
  },
} as HealthCheckInterface;
