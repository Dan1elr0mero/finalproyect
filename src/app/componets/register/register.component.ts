import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Usuarios } from '../../interfaces/usuarios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  usersService: UsersService = inject(UsersService);
  credencialesRegister = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  manejarEnvio() {
    if (this.credencialesRegister.valid) {
    }
    console.log('works...');
  }
}
