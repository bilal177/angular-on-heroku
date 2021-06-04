import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authentication/login.component';
import { HomeComponent } from './home.component';
import { AuthRoutingModule } from '../authentication/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../authentication/auth-service.service';
import { AuthGuard } from '../authentication/auth.guard';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[
    AuthServiceService,
    AuthGuard
  ]
})
export class HomeModule { }
