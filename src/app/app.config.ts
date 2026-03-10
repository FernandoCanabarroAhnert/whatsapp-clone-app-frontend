import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './utils/keycloak/keycloak.service';
import { keycloakInterceptor } from './utils/http/keycloak-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakInterceptor])),
    provideAppInitializer(() => {
      const initFn = ((kc: KeycloakService) => {
        return () => kc.init();
      })(inject(KeycloakService));
      return initFn();
    })
  ]
};
