import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuarios';
import { ResponseapiUser, User } from '../interfaces/apiResponse';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor() {}
  router = inject(Router);
  httpClient = inject(HttpClient);
  API_URL: string = 'http://3.138.36.232:8080/usuarios';
  crearUsuario(credencialesRegister: User) {
    return this.httpClient.post(this.API_URL, credencialesRegister);
  }
  getUsers(): Observable<ResponseapiUser> {
    return this.httpClient.get<ResponseapiUser>(this.API_URL);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
  updateUser(id: string, user: User) {
    return this.httpClient.put(`${this.API_URL}/${id}`, user);
  }
}
