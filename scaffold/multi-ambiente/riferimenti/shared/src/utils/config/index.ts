import devConfig from './dev';
import testConfig from './test';
import prodConfig from './prod';
import type { AppConfig } from './types';

const ENV = process.env.ENV ?? 'dev';

let config: AppConfig;
if (ENV === 'prod') {
  config = prodConfig;
} else if (ENV === 'test') {
  config = testConfig;
} else {
  config = devConfig;
}

export default config;
