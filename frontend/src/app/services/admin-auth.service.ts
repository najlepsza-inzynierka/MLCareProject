import { Injectable } from '@angular/core';
import {Admin} from '../interfaces/admin';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  admin;
  token = '';
  adminToAdd;
  institutionToAdd;
  constructor(private http: HttpClient,
              private router: Router,
              private snaackBar: MatSnackBar) { }

  public signIn(adminData: Admin){
    // this.adminToAdd = {
    //   firstName: 'Jakub',
    //   middleName: 'Darek',
    //   lastName: 'Nazwisko2',
    //   address: 'Grr',
    //   phoneNumber: '123123123',
    //   email: 'jn@mail.com',
    //   password: 'supertajnehaslo'
    // };
    // this.institutionToAdd = {
    //   institutionName: 'aaaa szpital',
    //   address: 'Katowice',
    //   phoneNumber: '33333',
    //   email: 'a@szpital.com',
    //   usersLimit: 2
    // };
    // this.http.post('/api/institutions', this.institutionToAdd).subscribe(result => console.log(result));
    // this.http.post('/api/institutions/5f81cde70fa8a2c83359d1d1/admin', this.adminToAdd).subscribe(result => console.log(result));
    this.http.post('/api/admins/login', adminData).subscribe(r => {
      this.admin = r;
      console.log(r);
      if (this.admin.status === 'success'){
        localStorage.setItem('ACCESS_TOKEN_ADMIN', 'access_token');
        this.router.navigateByUrl(`/admin-panel`);
        this.token = this.admin.auth_token;
        this.openSnackBar('Successfully logged in as admin', 'Close');
      }
    },
        error => {
          this.openSnackBar(error.error.message, 'Close');
        });
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 5000,
    });
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN_ADMIN') !== null;
  }

  public logout(){
    this.http.post('/api/admins/logout', this.admin).subscribe(r => {
      this.admin = r;
      console.log(r);
      if (this.admin.status === 'success'){
        this.router.navigateByUrl(`/admin-login`);
      }
    });
    localStorage.removeItem('ACCESS_TOKEN_ADMIN');
  }

  public getAuthorizationToken(){
    return this.token;
  }
}
