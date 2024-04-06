import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { IndexComponent } from './componets/index/index.component';
import { LoginComponent } from './componets/login/login.component';
import { FooterComponent } from './componets/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BASSBOX';
}
