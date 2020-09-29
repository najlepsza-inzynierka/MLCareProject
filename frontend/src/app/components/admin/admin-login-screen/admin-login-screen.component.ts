import { Component, OnInit } from '@angular/core';
import {User} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-login-screen',
  templateUrl: './admin-login-screen.component.html',
  styleUrls: ['./admin-login-screen.component.css']
})
export class AdminLoginScreenComponent implements OnInit {
  id: number;
  user: User;
  isSubmitted  =  false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.clearData();
  }

  signIn(){
    this.isSubmitted = true;
    this.id = 1;
    this.authService.signIn(this.user);
    this.router.navigateByUrl(`/admin-panel/${this.id}`);
  }

  clearData(): void{
    this.user = {
      email: '',
      password: ''
    };
  }

}
