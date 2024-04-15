import { createReducer, on } from '@ngrx/store';
import { fillStateCarProducts, removeProductFromCart } from './product.action';
import { Product } from '../interfaces/product';

export const emptyCar: Product[] = [];

export const productsReducer = createReducer(
  emptyCar,
  on(fillStateCarProducts, (emptyCar, { carData }) => {
    const newState = [...emptyCar, carData];
    return newState;
    console.log(newState);
  }),
  on(removeProductFromCart, (state, { product }) => {
    // Filtrar los productos del carrito, removiendo el producto especificado
    return state.filter((item) => item !== product);
  })
);
