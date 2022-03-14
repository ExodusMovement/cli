import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import {logger, findProjectRoot} from '@react-native-community/cli-tools';
import {HealthCheckInterface, EnvironmentInfo} from '../../types';

const getBuildToolsVersion = (): string => {
  let projectRoot = '';
  try {
    // doctor is a detached command, so we may not be in a RN project.
    projectRoot = findProjectRoot();
  } catch {
    logger.log(); // for extra space
    logger.warn(
      "We couldn't find a package.json in this directory. Android SDK checks may fail. Doctor works best in a React Native project root.",
    );
  }
  const gradleBuildFilePath = path.join(projectRoot, 'android/build.gradle');

  const buildToolsVersionEntry = 'buildToolsVersion';

  if (!fs.existsSync(gradleBuildFilePath)) {
    return 'Not Found';
  }

  // Read the content of the `build.gradle` file
  const gradleBuildFile = fs.readFileSync(gradleBuildFilePath, 'utf-8');

  const buildToolsVersionIndex = gradleBuildFile.indexOf(
    buildToolsVersionEntry,
  );

  const buildToolsVersion = (
    gradleBuildFile
      // Get only the portion of the declaration of `buildToolsVersion`
      .substring(buildToolsVersionIndex)
      .split('\n')[0]
      // Get only the the value of `buildToolsVersion`
      .match(/\d|\../g) || []
  ).join('');

  return buildToolsVersion || 'Not Found';
};

const installMessage = `Read more about how to update Android SDK at ${chalk.dim(
  'https://developer.android.com/studio',
)}`;

const isSDKInstalled = (environmentInfo: EnvironmentInfo) => {
  const version = environmentInfo.SDKs['Android SDK'];
  return version !== 'Not Found';
};

export default {
  label: 'Android SDK',
  description: 'Required for building and installing your app on Android',
  getDiagnostics: async ({SDKs}) => {
    const requiredVersion = getBuildToolsVersion();
    const buildTools =
      typeof SDKs['Android SDK'] === 'string'
        ? SDKs['Android SDK']
        : SDKs['Android SDK']['Build Tools'];

    const isAndroidSDKInstalled = Array.isArray(buildTools);

    const isRequiredVersionInstalled = isAndroidSDKInstalled
      ? buildTools.includes(requiredVersion)
      : false;

    return {
      versions: isAndroidSDKInstalled ? buildTools : SDKs['Android SDK'],
      versionRange: requiredVersion,
      needsToBeFixed: !isRequiredVersionInstalled,
    };
  },
  runAutomaticFix: async ({loader, logManualInstallation, environmentInfo}) => {
    loader.fail();

    if (isSDKInstalled(environmentInfo)) {
      return logManualInstallation({
        message: installMessage,
      });
    }

    return logManualInstallation({
      healthcheck: 'Android SDK',
      url: 'https://reactnative.dev/docs/environment-setup',
    });
  },
} as HealthCheckInterface;
