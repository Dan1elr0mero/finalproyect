import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  Validator,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../interfaces/usuarios';
import { LoginResponse } from '../../interfaces/login';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { logOut, logInSuccess } from '../../store/login.actions';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //constructor necessary for the operation ngrx
  constructor(private store: Store<AppState>) {}

  router = inject(Router);
  toastrService = inject(ToastrService);
  UsersService: UsersService = inject(UsersService);
  credenciales = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  });

  manejarEnvio() {
    if (this.credenciales.valid) {
      const nombreUsuario = this.credenciales.value.nombreUsuario;
      const contrasenia = this.credenciales.value.contrasenia;

      if (
        typeof nombreUsuario === 'string' &&
        typeof contrasenia === 'string'
        //verification of data type
      ) {
        const credenciales: Usuario = {
          _id: '',
          nombreUsuario,
          contrasenia,
        };
        this.UsersService.iniciarSesion(credenciales).subscribe(
          (respuesta: LoginResponse) => {
            if (respuesta.result === 'good') {
              //ngrx

              // fill the state whit dispatch
              this.store.dispatch(logInSuccess({ loginResponse: respuesta }));
              //end ngrx
              const decodificado = jwtHelperService.decodeToken(
                respuesta.data.token
              );
              //admin session
              if (decodificado.id == '66159dd47ee7c2b4c0e60baf') {
                this.router.navigateByUrl('/admin');
              } else {
                //user session

                localStorage.setItem('token', respuesta.data.token);
                localStorage.setItem('data', JSON.stringify(decodificado));
                this.toastrService.success('Bienvenido');
                this.router.navigateByUrl('/privateindex');
              }
            } else {
              //error at the login
              this.toastrService.error('error al iniciar sesion');
            }
          }
        );
      }
    }
  }
}
