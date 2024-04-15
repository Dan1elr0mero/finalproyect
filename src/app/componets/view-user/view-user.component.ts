import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/apiResponse';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css',
})
export class ViewUserComponent {
  //varibles
  user!: User;

  constructor(public activeModal: NgbActiveModal) {}
  @Input() messageFromParent!: User;

  ngOnInit() {
    this.user = this.messageFromParent;
  }
  closeModal() {
    this.activeModal.close();
  }
}
