import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { User, ResponseapiUser } from '../../interfaces/apiResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CreateUserService } from '../../services/create-user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  credencialesRegister = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nombreUsuario: new FormControl('', Validators.required),
    contrasenia1: new FormControl('', Validators.required),
    contrasenia2: new FormControl('', Validators.required),
  });

  router = inject(Router);
  CreateUserService: CreateUserService = inject(CreateUserService);

  manejarEnvio() {
    const nombre = this.credencialesRegister.value.nombre;
    const nombreUsuario = this.credencialesRegister.value.nombreUsuario;
    const contrasenia1 = this.credencialesRegister.value.contrasenia1;
    const contrasenia2 = this.credencialesRegister.value.contrasenia2;

    if (
      typeof nombre === 'string' &&
      typeof nombreUsuario === 'string' &&
      typeof contrasenia1 === 'string' &&
      typeof contrasenia2 === 'string'
    ) {
      if (this.credencialesRegister.valid) {
        if (contrasenia1 == contrasenia2) {
          console.log('contraseñas iguales');

          const credencialesValidaddas: User = {
            _id: '',
            nombre,
            nombreUsuario,
            contrasenia: contrasenia1,
            createdAt: undefined,
            updatedAt: undefined,
          };
          this.CreateUserService.crearUsuario(credencialesValidaddas).subscribe(
            (response: any) => {
              // console.log('lo logro señor');
              this.router.navigateByUrl('/login');
            }
          );
          // console.log(credencialesValidaddas);
        } else {
          console.log('contraseñas diferentes');
          alert('contraseñas diferentes');
        }
      }
    }

    // console.log('works...');
  }
}
