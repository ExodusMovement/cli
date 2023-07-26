interface Args {
  scheme?: string;
  mode: string;
}

export function getConfigurationScheme({mode}: Args, _sourceDir: string) {
  return mode || 'Debug';
}
