import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuarios';
import { LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static iniciarSesion() {
    throw new Error('Method not implemented.');
  }
  constructor() {}
  router = inject(Router);
  httpClient = inject(HttpClient);
  API_URL: string = 'http://3.138.36.232:8080/login';

  iniciarSesion(credenciales: Usuario) {
    return this.httpClient.post<LoginResponse>(this.API_URL, credenciales);
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
