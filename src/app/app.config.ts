import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Shared/Interceptors/AuthInterceptors/auth.interceptor';
import { loaderInterceptor } from './Shared/Interceptors/LoaderInterceptor/loader.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loaderInterceptor
      ])
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.light-mode',
        },
      },
    }),
  ],
};
