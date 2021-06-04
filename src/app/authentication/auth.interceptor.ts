import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    if (token){
      request = request.clone({
        headers: request.headers.set(
          'Authorization', ('Bearer ' + token)
        )
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.error == "Invalid token"){
          let apiUrl = `${baseUrl}/auth/refresh`;
          let header = new HttpHeaders({
            'Authorization': 'Bearer' + sessionStorage.getItem('token'),
            'Content-type': 'application/x-www-form-urlencoded'
          })
          this.http.post<any>(apiUrl, {refresh_token: sessionStorage.getItem('refresh_token')},{ headers: header}).pipe(
            map(response => {
              this.addTokens(response.accessToken, response.refreshToken);
              request = request.clone({
                headers: request.headers.set(
                  'Authorization', ('Bearer ' + response.accessToken)
                )
              });
            }),
            catchError(this.handleError<any[]>('updateAccess', []))
          )
        }
        return throwError(err);
      })
    );
  }

  addTokens(accessToken: string, refreshToken: string){
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
