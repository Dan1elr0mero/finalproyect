import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  router = inject(Router);
  httpClient = inject(HttpClient);
  API_URL: string = 'http://localhost:4500/login';

  iniciarSesion(credenciales: Usuarios) {
    return this.httpClient.post(this.API_URL, credenciales);
  }

  validarToken(token: string) {
    return this.httpClient.get(`${this.API_URL}/${token}`);
  }

  estaLogueado() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
