import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor() {}
  router = inject(Router);
  httpClient = inject(HttpClient);
  API_URL: string = 'http://localhost:4500/usuarios';
  crearUsuario(credencialesRegister: Usuarios) {
    return this.httpClient.post(this.API_URL, credencialesRegister);
  }
  leerTodos() {
    return this.httpClient.get(this.API_URL);
  }

  leer(id: string) {
    return this.httpClient.get(this.API_URL + '/' + id);
  }

  edit(id: string, usuario: Usuarios) {
    return this.httpClient.put(`${this.API_URL}/${id}`, usuario);
  }

  delate(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
