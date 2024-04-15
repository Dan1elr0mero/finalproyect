import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

//negrx bullshit

import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { authReducer } from './store/login.reducer';
import { UserReducer } from './store/user.reducer';
import { productsReducer } from './store/product.reducer';
import { favoriteReducer } from './store/favorite.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    //activacion ngrx
    provideStore(),
    provideState({ name: 'loggedIn', reducer: authReducer }),
    provideState({ name: 'ProductsCarList', reducer: productsReducer }),
    provideState({ name: 'Usuarios', reducer: UserReducer }),
    provideState({ name: 'FavoriteProducts', reducer: favoriteReducer }),
  ],
};
