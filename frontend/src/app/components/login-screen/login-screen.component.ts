import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  user: User;
  isSubmitted  =  false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.clearData();
  }

  signIn(){
    this.isSubmitted = true;
    this.authService.signIn(this.user);
    this.router.navigateByUrl('/patients');
  }

  clearData(): void{
    this.user = {
      email: '',
      password: ''
    };
  }

}
