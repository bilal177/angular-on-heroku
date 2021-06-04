import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
