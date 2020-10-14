import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../../services/admin-auth.service';
import {Admin} from '../../../interfaces/admin';

@Component({
  selector: 'app-admin-login-screen',
  templateUrl: './admin-login-screen.component.html',
  styleUrls: ['../../login-screen/login-screen.component.css', './admin-login-screen.component.css']
})
export class AdminLoginScreenComponent implements OnInit {
  id: string;
  admin: Admin;
  isSubmitted  =  false;

  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit(): void {
    this.clearData();
  }

  signIn(){
    this.isSubmitted = true;
    this.adminAuthService.signIn(this.admin);
  }

  clearData(): void{
    this.admin = {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      password: ''
    };
  }

}
