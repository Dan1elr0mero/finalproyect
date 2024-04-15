import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product';

export const fillStateCarProducts = createAction(
  '[PrivateIndex Componet] fill state car products',
  props<{ carData: Product }>()
);

export const removeProductFromCart = createAction(
  '[Shopping Cart] Remove Product From Cart',
  props<{ product: Product }>()
);
