import { LoginResponse } from './interfaces/login';
import { Product } from './interfaces/product';
import { Usuario } from './interfaces/usuarios';
export interface AppState {
  readonly loggedIn: LoginResponse;
  readonly ProductsCarList: Product[];
  readonly Usuarios: Usuario[];
  readonly FavoriteProducts: Product[];
}

//store = save the data
