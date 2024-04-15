import { createReducer, on } from '@ngrx/store';
import { Product } from '../interfaces/product';
import { addFavorite, removeFavorite } from './favorite.actions';

export const initState: Product[] = [];

export const favoriteReducer = createReducer(
  initState,
  on(addFavorite, (state, { product }) => {
    return [...state, product]; // Agregar el nuevo producto al final del array del estado
  }),
  on(removeFavorite, (state, { product }) => {
    return state.filter((item) => item !== product); // Filtrar el producto especificado y sacarlo de la lista de favoritos
  })
);
