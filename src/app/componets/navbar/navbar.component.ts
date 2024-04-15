import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from '../../interfaces/login';
import { ShoppingCarComponent } from '../shopping-car/shopping-car.component';
import { logOut } from '../../store/login.actions';
import { Usuario } from '../../interfaces/usuarios';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ShoppingCarComponent, FavoritesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  logget: boolean = false;
  verification: LoginResponse = {} as LoginResponse;
  users: Usuario[] = [];

  //constructor ngrx
  constructor(private store: Store<AppState>) {}

  logOut() {
    //call the action of logout

    this.store.dispatch(logOut());
  }

  ngOnInit() {
    //suscribe for any change in loggedin
    this.store
      .pipe(select('loggedIn'))
      .subscribe((respuesta: LoginResponse) => {
        // console.log(respuesta);
        this.verification = respuesta;
        // console.log(this.verification);
      });

    this.store.pipe(select('Usuarios')).subscribe((users: Usuario[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
