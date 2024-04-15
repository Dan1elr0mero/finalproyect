import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '../interfaces/login';

// Acción para iniciar sesión exitosamente
export const logInSuccess = createAction(
  '[Login] Log In Success',
  props<{ loginResponse: LoginResponse }>()
);

export const logOut = createAction('[Login] Log out');
