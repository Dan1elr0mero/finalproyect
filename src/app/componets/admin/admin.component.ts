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
import { Usuarios } from '../../interfaces/usuarios';
import { UsersService } from '../../services/users.service';
import { CreateUserService } from '../../services/create-user.service';
import { CommonModule } from '@angular/common';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  router = inject(Router);
  toastrService = inject(ToastrService);
  usersService: UsersService = inject(UsersService);
  createUserService: CreateUserService = inject(CreateUserService);
  ngOnInit() {
    this.manejarLeerTodos();
  }

  usuarios: any = [];

  idUser: string = '';

  manejarLeerTodos() {
    this.createUserService.leerTodos().subscribe((respuesta: any) => {
      this.usuarios = respuesta.data;
      // console.log(respuesta.data);
      this.manejarLeerTodos();
    });
  }
  manejarCTA(id: string) {
    this.idUser = id;
    console.log(this.idUser);
  }

  manejarBorrar(id: string) {
    console.log(id);
    this.createUserService.delate(id).subscribe((respuesta: any) => {
      console.log(respuesta);
      this.manejarLeerTodos();
      this.toastrService.warning('Eliminado');
    });
  }

  manejarEditar(id: string) {
    this.manejarLeerTodos();
  }
}
