import { Component, Inject, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../interfaces/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService: UsersService = Inject(UsersService);
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
      ) {
        const credencialesObj: Usuarios = {
          nombreUsuario,
          contrasenia,
        };
        this.userService
          .iniciarSesion(credencialesObj)
          .subscribe((respuesta: any) => {
            console.log(respuesta);
          });
      }
    }
  }
}
