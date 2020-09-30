import { Injectable } from '@angular/core';
import {Admin} from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }

  public signIn(adminData: Admin){
    if (adminData.email === 'admin' && adminData.password === 'admin'){
      localStorage.setItem('ACCESS_TOKEN_ADMIN', 'access_token');
    }
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN_ADMIN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN_ADMIN');
  }
}
