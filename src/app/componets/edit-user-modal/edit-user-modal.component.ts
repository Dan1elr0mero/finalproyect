import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css',
})
export class EditUserModalComponent {
  createUserService: CreateUserService = inject(CreateUserService);

  editedUser: User | undefined;
  @Input() messageFromParent!: User;
  user!: User;
  router = inject(Router);
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
    this.user = this.messageFromParent;
    this.editedUser = { ...this.user };
  }
  closeModal() {
    this.activeModal.close();
  }
  updateUser(id: string) {
    // console.log(this.editedUser);
    this.createUserService
      .updateUser(id, this.editedUser!)
      .subscribe((response) => {
        // console.log('actualizado', response);
        this.activeModal.close();
        this.router.navigateByUrl('/admin');
      });
  }
}
