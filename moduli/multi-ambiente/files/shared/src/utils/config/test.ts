import type { AppConfig } from './types';

const testConfig: AppConfig = {
  ENV: 'test',
  ads: {
    bannerId: 'ca-app-pub-3940256099942544/6300978111',
    interstitialId: 'ca-app-pub-3940256099942544/1033173712',
  },
  db: { name: 'APP_SLUG_test.db' },
  notifications: {
    channelId: 'APP_SLUG_channel',
    channelName: 'Notifiche APP_DISPLAY_NAME',
  },
  app: {
    name: 'APP_DISPLAY_NAME',
    version: '1.0.0',
    author: 'Marco Di Gioia',
    debugMode: true,
  },
};

export default testConfig;
