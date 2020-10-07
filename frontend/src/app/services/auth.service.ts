import { Injectable } from '@angular/core';
import { User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private result;
  token = '';
  constructor(private http: HttpClient,
              private router: Router,
              private snaackBar: MatSnackBar) { }

  public signIn(userData: User){
    this.http.post('/api/users/login', userData).subscribe(r => {
      this.result = r;
      console.log(r);
      this.token = this.result.auth_token;
      if (this.result.status === 'success'){
        localStorage.setItem('ACCESS_TOKEN_USER', 'access_token');
        this.openSnackBar('Successfully logged in', 'Close');
        this.router.navigateByUrl('/patients');
      }
    },
        error => {
      this.openSnackBar(error.message, 'Close');
        });
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN_USER') !== null;
  }

  public logout(){
    this.http.post('/api/users/logout', this.result).subscribe(r => {
      this.result = r;
      console.log(r);
      if (this.result.status === 'success'){
        this.router.navigateByUrl('/login');
      }
    });
    localStorage.removeItem('ACCESS_TOKEN_USER');
    }

  public getAuthorizationToken(){
    return this.token;
  }
}
