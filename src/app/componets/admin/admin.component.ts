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
import { Usuario } from '../../interfaces/usuarios';
import { UsersService } from '../../services/users.service';
import { CreateUserService } from '../../services/create-user.service';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { fillStateUsers } from '../../store/user.actions';
import { ResponseapiUser, User } from '../../interfaces/apiResponse';
import { NgFor } from '@angular/common';
import { LoginResponse } from '../../interfaces/login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewUserComponent } from '../view-user/view-user.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NgFor, ViewUserComponent, EditUserModalComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  //constructor necessary for the operation ngrx
  constructor(private store: Store<AppState>, private modalService: NgbModal) {}
  users: ResponseapiUser | undefined;
  realUsers: any;
  router = inject(Router);
  toastrService = inject(ToastrService);
  usersService: UsersService = inject(UsersService);
  createUserService: CreateUserService = inject(CreateUserService);
  ngOnInit() {
    this.manejarLeerTodos();
  }

  verification: LoginResponse = {} as LoginResponse;

  idUser: string = '';

  manejarLeerTodos() {
    //call api
    this.createUserService.getUsers().subscribe((data: ResponseapiUser) => {
      this.users = data;
      console.log(this.users);
    });
  }
  delateUser(id: string) {
    this.createUserService.deleteUser(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit;
      this.toastrService.warning('Eliminado');
    });
  }
  viewUser(user: User) {
    const modalRef = this.modalService.open(ViewUserComponent, {
      windowClass: 'modal-custom',
    });
    modalRef.componentInstance.messageFromParent = user;
    // console.log(product);
  }

  editUser(user: User) {
    const modalRe = this.modalService.open(EditUserModalComponent, {
      windowClass: 'modal-custom',
    });
    modalRe.componentInstance.messageFromParent = user;
    // console.log(product);
  }
}
