// src/main.server.ts
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appServerConfig } from './app/app.config.server';

// El builder SSR llamará a este default export pasándote el context
export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(App, appServerConfig, context);
}