import { createAction, props } from '@ngrx/store';
import { Usuario } from '../interfaces/usuarios';

export const fillStateUsers = createAction(
  '[admin components] fill state users',
  props<{ usuarios: Usuario[] }>()
);

//fill the authentication status
