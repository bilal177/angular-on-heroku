import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private dataService: AuthServiceService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean{
    if (this.dataService.checkAuthentication()){
      return true;
    }else {
      this.dataService.setAuthenticate(false);
      this.dataService.fromRouter = true;
      this.dataService.redirectUrl = url;
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
