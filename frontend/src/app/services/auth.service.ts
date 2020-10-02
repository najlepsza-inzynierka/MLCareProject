import { Injectable } from '@angular/core';
import { User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  result;
  token = '';
  constructor(private http: HttpClient,
              private router: Router) { }

  public signIn(userData: User){
    this.http.post('/api/users/login', userData).subscribe(r => {
      this.result = r;
      console.log(r);
      this.token = this.result.auth_token;
      if (this.result.status === 'success'){
        localStorage.setItem('ACCESS_TOKEN_USER', 'access_token');
        this.router.navigateByUrl('/patients');
      }
    });
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN_USER') !== null;
  }

    public logout(){
    localStorage.removeItem('ACCESS_TOKEN_USER');
  }

  public getAuthorizationToken(){
    return this.token;
  }
}
