import { ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

// Si necesitas providers solo-SSR, agrégalos aquí.
export const appServerConfig: ApplicationConfig = {
  ...appConfig,
  // providers: [...appConfig.providers, /* otros providers SSR-only */],
};