import {join} from 'path';

import {HealthCheckInterface} from '../../types';

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
} as HealthCheckInterface;
