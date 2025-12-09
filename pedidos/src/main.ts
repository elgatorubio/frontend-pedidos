import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig as config } from './app/app.config'; // o importa 'config' si usaste Opción A

bootstrapApplication(App, config).catch(console.error);