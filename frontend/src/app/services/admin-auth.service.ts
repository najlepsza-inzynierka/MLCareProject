import { Injectable } from '@angular/core';
import {Admin} from '../interfaces/admin';
import {HttpClient, HttpResponse, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  result;
  token = '';
  constructor(private http: HttpClient,
              private router: Router) { }

  public signIn(adminData: Admin, id){
    this.http.post('api/admins/login', adminData).subscribe(r => {
      this.result = r;
      console.log(r);
      if (this.result.status === 'success'){
        localStorage.setItem('ACCESS_TOKEN_ADMIN', 'access_token');
        this.router.navigateByUrl(`/admin-panel/${id}`);
        this.token = this.result.auth_token;
      }
    });
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN_ADMIN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN_ADMIN');
  }

  public getAuthorizationToken(){
    return this.token;
  }
}
