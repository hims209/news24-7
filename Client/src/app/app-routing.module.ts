//Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageNewsComponent } from './components/admin_facing/manage-news/manage-news.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AboutusComponent } from './components/customerfacing/aboutus/aboutus.component';
import { ChatboxComponent } from './components/customerfacing/chatbox/chatbox.component';
import { ContactusComponent } from './components/customerfacing/contactus/contactus.component';
import { CustomerhomeComponent } from './components/customerfacing/customerhome/customerhome.component';
import { SportsComponent } from './components/customerfacing/sports/sports.component';
import { WeatherComponent } from './components/customerfacing/weather/weather.component';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';

//define routes
const routes: Routes = [
  {
    path: '',
    component: CustomerhomeComponent,
    canActivate: [CustomerGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'livechat',
    component: ChatboxComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'customerhome',
    component: CustomerhomeComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'sports',
    component: SportsComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'manage-news',
    component: ManageNewsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
