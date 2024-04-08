import { Routes } from '@angular/router';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { IndexComponent } from './componets/index/index.component';
import { LoginComponent } from './componets/login/login.component';
import { FooterComponent } from './componets/footer/footer.component';
import { AboutusComponent } from './componets/aboutus/aboutus.component';
import { CoursesComponent } from './componets/courses/courses.component';
import { PrivateindexComponent } from './componets/privateindex/privateindex.component';
import { NotfoundComponent } from './componets/notfound/notfound.component';
import { RegisterComponent } from './componets/register/register.component';
import { AdminComponent } from './componets/admin/admin.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent, title: 'iniciar sesion' },
  { path: 'register', component: RegisterComponent, title: 'Registrate' },
  { path: 'courses', component: CoursesComponent, title: 'cursos' },
  { path: 'aboutus', component: AboutusComponent, title: 'Nosotros' },
  { path: 'privateindex', component: PrivateindexComponent },
  { path: 'admin', component: AdminComponent, title: 'admin' },
  { path: '**', component: NotfoundComponent, title: 'error=404' },
];
