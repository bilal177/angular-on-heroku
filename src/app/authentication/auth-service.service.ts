import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  fromRouter!: boolean;
  redirectUrl!: string;
  authenticated!: boolean;
  authenticateWatcher = new Subject<boolean>();

  setAuthenticate(key: boolean){
    this.authenticated = key;
    this.authenticateWatcher.next(true);
  }

  watchAuthenticate(): Observable<any>{
    return this.authenticateWatcher.asObservable();
  }

  checkAuthentication(){
    if (sessionStorage.getItem('token')!= undefined && sessionStorage.getItem('refresh_token')!= undefined){
      return true;
    }else{
      return false;
    }
  }

  constructor(private http:HttpClient) { }
  login(data: {email: string, password: string}):Observable<any>{
    return this.http.post<any>(`${baseUrl}auth/login`, data).pipe(
      map((response) => {
        this.addTokens(response.token, response.refreshToken);
        return response.message;
      }),
      catchError(this.loginHandleError)
    )
  }

  addTokens(token: string, refreshToken: string){
    this.setAuthenticate(true);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  private loginHandleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('An error occured: ', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}` + ` body was: ${error.error.console.errors[0]}` );
    }
    return throwError(`${error.error.console.errors[0]}`);
  }
}
