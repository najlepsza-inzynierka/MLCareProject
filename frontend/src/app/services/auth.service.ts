import { Injectable } from '@angular/core';
import { User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public signIn(userData: User){
    if (userData.email === 'abc' && userData.password === 'aaa'){
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
    }
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

    public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
