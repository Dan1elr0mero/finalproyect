import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  API_url = 'http://localhost:4500/login';
  httpClient = inject(HttpClient);

  crear(usuario: Usuarios) {
    return this.httpClient.post(this.API_url, usuario);
  }

  leerTodos() {
    return this.httpClient.get(this.API_url);
  }

  leer(id: string) {
    return this.httpClient.get(this.API_url + '/' + id);
  }

  actualizar(id: string, usuario: Usuarios) {
    return this.httpClient.put(`${this.API_url}/${id}`, usuario);
  }

  eliminar(id: string) {
    return this.httpClient.delete(`${this.API_url}/${id}`);
  }

  iniciarSesion(credencialesRegister: Usuarios) {
    return this.httpClient.post(this.API_url, credencialesRegister);
  }
}
