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
import { Usuarios } from '../../interfaces/usuarios';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  UsersService: UsersService = inject(UsersService);
  credenciales = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  });

  manejarEnvio() {
    console.log('hice click');
    if (this.credenciales.valid) {
      const nombreUsuario = this.credenciales.value.nombreUsuario;
      const contrasenia = this.credenciales.value.contrasenia;

      if (
        typeof nombreUsuario === 'string' &&
        typeof contrasenia === 'string'
      ) {
        console.log('la contraseña y susuario son string');
        const credenciales: Usuarios = {
          nombreUsuario,
          contrasenia,
        };

        this.UsersService.iniciarSesion(credenciales).subscribe(
          (respuesta: any) => {
            if (respuesta.result === 'good') {
              const decodificado = jwtHelperService.decodeToken(
                respuesta.data.token
              );

              console.log(decodificado);

              localStorage.setItem('token', respuesta.data.token);
              localStorage.setItem('data', JSON.stringify(decodificado));
              this.toastrService.success('Bienvenido');
              this.router.navigateByUrl('/privateindex');
            } else {
              this.toastrService.error('error al iniciar sesion');
            }
          }
        );
      }
    }
  }
}
