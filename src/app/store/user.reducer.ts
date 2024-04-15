import { createReducer, on } from '@ngrx/store';
import { fillStateUsers } from './user.actions';
import { Usuario } from '../interfaces/usuarios';

export interface UsuariosState {
  usuarios: Usuario[];
}
export const initState: UsuariosState = {
  usuarios: [],
};
export const UserReducer = createReducer(
  initState,
  on(fillStateUsers, (state, { usuarios }) => ({
    ...state,
    usuarios: usuarios,
  }))
);
