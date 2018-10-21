import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isUserAuthenticated=false;

  constructor(private http:HttpClient, private router:Router) { }

  authenticate(email: string, password: string) {
  
    return this.http.post<any>(environment.authUrl, { email, password })
    .pipe(map(response => {
      if(response && response.token) {  
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        this.isUserAuthenticated = true;
      }
      return response;
    }
    ));
  }

  isAuthenticated() {
    return sessionStorage.hasOwnProperty('currentUser') || this.isUserAuthenticated;
  }

  isUserAdmin() {
    return this.isAuthenticated && JSON.parse(sessionStorage.getItem('currentUser')).isAdmin;
  }
  
  logout() {
    // remove user from session storage to log user out
    sessionStorage.clear();
    this.isUserAuthenticated = false;
    this.router.navigate(['/login']);
    

}


}
