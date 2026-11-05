# Gestione Ambienti — APP_DISPLAY_NAME

## Come funziona

La variabile `ENV` viene iniettata da Babel al bundle time. Il codice compilato contiene già i valori corretti per quell'ambiente.

```
ENV=prod npm run android:prod
       │
       └─▶ Babel inietta "prod" nel bundle
              └─▶ config/index.ts carica config/prod.ts
                     └─▶ constants.ts espone i valori corretti
                            └─▶ DbService, AdsService, NotificheService usano quei valori
```

## Differenze tra gli ambienti

| Impostazione              | dev                 | test                 | prod            |
|---------------------------|---------------------|----------------------|-----------------|
| **AdMob Banner ID**       | Google Test ID      | Google Test ID       | ID reale AdMob  |
| **AdMob Interstitial ID** | Google Test ID      | Google Test ID       | ID reale AdMob  |
| **Nome database**         | `APP_SLUG_dev.db`       | `APP_SLUG_test.db`       | `APP_SLUG.db`       |
| **debugMode**             | `true`              | `true`               | `false`         |

## Comandi

```bash
npm run start:dev       # Metro bundler — ENV=dev
npm run android:dev     # Build debug — ENV=dev
npm run android:test    # Build debug — ENV=test
npm run android:prod    # Build debug — ENV=prod
npm run type-check      # Verifica TypeScript
```

## AdMob

Sostituire i placeholder in `shared/src/utils/config/prod.ts` con gli ID reali da AdMob Console.
