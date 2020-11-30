import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  user: User;
  isSubmitted  =  false;
  hidden = true;

  constructor(private authService: AuthService,
              private router: Router,
              private snaackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.clearData();
    if (this.authService.isLoggedIn()){
      this.router.navigateByUrl('patients');
    }
  }

  signIn(){
    this.isSubmitted = true;
    this.authService.signIn(this.user);
  }

  clearData(): void{
    this.user = {
      email: '',
      password: ''
    };
  }

  openSnackBar(message: string, action: string) {
    this.snaackBar.open(message, action, {
      duration: 2000,
    });
  }

}
