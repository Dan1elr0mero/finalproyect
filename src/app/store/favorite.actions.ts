import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product';

export const addFavorite = createAction(
  '[Favorite ] addFavorite',
  props<{ product: Product }>()
);
export const removeFavorite = createAction(
  '[Favorite] Remove Favorite',
  props<{ product: Product }>()
);
