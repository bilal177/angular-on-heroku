import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  formGroup!: FormGroup;
  constructor(private toastr: ToastrService, private authService: AuthServiceService, private router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
    });
  }
  loginProces(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
          console.log(result);
          this.toastr.success("Login successfull!")
          sessionStorage.setItem('auth', 'true');
          this.router.navigate(['/home']);
      },err => {
        this.toastr.error(err);
      });

    }
  }
}
