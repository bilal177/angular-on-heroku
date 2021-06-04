import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  {path:'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path:'auth', loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
